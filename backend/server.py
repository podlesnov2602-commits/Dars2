from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Property(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    price: float
    location: str
    property_type: str  # apartment, house, villa, etc.
    area: float  # in square meters
    rooms: int
    bathrooms: int
    images: List[str]
    features: List[str] = []
    status: str = "available"  # available, sold, rented
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PropertyCreate(BaseModel):
    title: str
    description: str
    price: float
    location: str
    property_type: str
    area: float
    rooms: int
    bathrooms: int
    images: List[str]
    features: List[str] = []
    status: str = "available"

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    location: Optional[str] = None
    property_type: Optional[str] = None
    area: Optional[float] = None
    rooms: Optional[int] = None
    bathrooms: Optional[int] = None
    images: Optional[List[str]] = None
    features: Optional[List[str]] = None
    status: Optional[str] = None


# Property Routes
@api_router.get("/properties", response_model=List[Property])
async def get_properties(
    property_type: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    location: Optional[str] = None,
    status: Optional[str] = None
):
    """
    Get all properties with optional filters
    """
    query = {}
    
    if property_type:
        query['property_type'] = property_type
    if status:
        query['status'] = status
    if location:
        query['location'] = {'$regex': location, '$options': 'i'}
    if min_price is not None or max_price is not None:
        query['price'] = {}
        if min_price is not None:
            query['price']['$gte'] = min_price
        if max_price is not None:
            query['price']['$lte'] = max_price
    
    properties = await db.properties.find(query, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for prop in properties:
        if isinstance(prop.get('created_at'), str):
            prop['created_at'] = datetime.fromisoformat(prop['created_at'])
    
    return properties

@api_router.get("/properties/{property_id}", response_model=Property)
async def get_property(property_id: str):
    """
    Get a single property by ID
    """
    prop = await db.properties.find_one({"id": property_id}, {"_id": 0})
    
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Convert ISO string timestamp back to datetime object
    if isinstance(prop.get('created_at'), str):
        prop['created_at'] = datetime.fromisoformat(prop['created_at'])
    
    return prop

@api_router.post("/properties", response_model=Property)
async def create_property(property_data: PropertyCreate):
    """
    Create a new property
    """
    property_dict = property_data.model_dump()
    property_obj = Property(**property_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = property_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.properties.insert_one(doc)
    return property_obj

@api_router.put("/properties/{property_id}", response_model=Property)
async def update_property(property_id: str, property_data: PropertyUpdate):
    """
    Update an existing property
    """
    # Get existing property
    existing_prop = await db.properties.find_one({"id": property_id}, {"_id": 0})
    
    if not existing_prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Update only provided fields
    update_data = property_data.model_dump(exclude_unset=True)
    
    if update_data:
        await db.properties.update_one(
            {"id": property_id},
            {"$set": update_data}
        )
    
    # Get updated property
    updated_prop = await db.properties.find_one({"id": property_id}, {"_id": 0})
    
    # Convert ISO string timestamp back to datetime object
    if isinstance(updated_prop.get('created_at'), str):
        updated_prop['created_at'] = datetime.fromisoformat(updated_prop['created_at'])
    
    return updated_prop

@api_router.delete("/properties/{property_id}")
async def delete_property(property_id: str):
    """
    Delete a property
    """
    result = await db.properties.delete_one({"id": property_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    
    return {"message": "Property deleted successfully"}

@api_router.get("/")
async def root():
    return {"message": "Real Estate API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()