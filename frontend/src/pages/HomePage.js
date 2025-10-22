import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, MapPin, Home, Building2, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    location: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, filters]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API}/properties`);
      setProperties(response.data);
      setFilteredProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (filters.propertyType && filters.propertyType !== 'all') {
      filtered = filtered.filter(p => p.property_type === filters.propertyType);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="homepage" data-testid="homepage">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="logo">
            <Home className="logo-icon" />
            <span>PREMIUM ESTATES</span>
          </div>
          <div className="nav-links">
            <Link to="/" data-testid="nav-home-link">Главная</Link>
            <Link to="/#catalog" data-testid="nav-catalog-link">Каталог</Link>
            <Link to="/admin" data-testid="nav-admin-link">
              <Button variant="outline" className="admin-btn">
                Админ-панель
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title" data-testid="hero-title">
            Найдите дом своей мечты
          </h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            Эксклюзивные предложения премиальной недвижимости
          </p>
          <Button className="hero-btn" data-testid="hero-cta-button">
            Посмотреть объекты
          </Button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section" id="catalog" data-testid="filters-section">
        <div className="filters-container">
          <h2 className="filters-title">Найти недвижимость</h2>
          <div className="filters-grid">
            <div className="filter-item">
              <label>Тип недвижимости</label>
              <Select 
                value={filters.propertyType} 
                onValueChange={(value) => setFilters({...filters, propertyType: value})}
              >
                <SelectTrigger data-testid="filter-type-select">
                  <SelectValue placeholder="Все типы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="apartment">Квартира</SelectItem>
                  <SelectItem value="house">Дом</SelectItem>
                  <SelectItem value="villa">Вилла</SelectItem>
                  <SelectItem value="penthouse">Пентхаус</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="filter-item">
              <label>Район</label>
              <Input 
                type="text" 
                placeholder="Введите район"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                data-testid="filter-location-input"
              />
            </div>

            <div className="filter-item">
              <label>Мин. цена</label>
              <Input 
                type="number" 
                placeholder="От"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                data-testid="filter-min-price-input"
              />
            </div>

            <div className="filter-item">
              <label>Макс. цена</label>
              <Input 
                type="number" 
                placeholder="До"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                data-testid="filter-max-price-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="properties-section" data-testid="properties-section">
        <div className="properties-container">
          {loading ? (
            <div className="loading" data-testid="loading-indicator">Загрузка...</div>
          ) : filteredProperties.length === 0 ? (
            <div className="no-results" data-testid="no-results-message">
              <p>Объекты не найдены. Попробуйте изменить фильтры.</p>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <Link 
                  to={`/property/${property.id}`} 
                  key={property.id} 
                  className="property-card"
                  data-testid={`property-card-${property.id}`}
                >
                  <div className="property-image-container">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="property-image"
                      data-testid="property-image"
                    />
                    <div className="property-badge" data-testid="property-status">
                      {property.status === 'available' ? 'Доступно' : 'Продано'}
                    </div>
                  </div>
                  <div className="property-content">
                    <h3 className="property-title" data-testid="property-title">{property.title}</h3>
                    <div className="property-location" data-testid="property-location">
                      <MapPin size={16} />
                      <span>{property.location}</span>
                    </div>
                    <div className="property-details">
                      <span data-testid="property-rooms">{property.rooms} комнат</span>
                      <span>•</span>
                      <span data-testid="property-area">{property.area} м²</span>
                      <span>•</span>
                      <span data-testid="property-bathrooms">{property.bathrooms} ванные</span>
                    </div>
                    <div className="property-price" data-testid="property-price">{formatPrice(property.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>PREMIUM ESTATES</h4>
              <p>Эксклюзивные предложения премиальной недвижимости</p>
            </div>
            <div className="footer-section">
              <h4>Контакты</h4>
              <p>Email: info@premiumestates.ru</p>
              <p>Телефон: +7 (495) 123-45-67</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Premium Estates. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;