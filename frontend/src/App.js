import React from 'react';
import {
  Activity, BatteryCharging, Boxes, CircleDot, DoorOpen, Droplets, Eye, Fingerprint,
  Fuel, Gauge, IdCard, LocateFixed, Satellite,
  Thermometer, Truck, Video, Waypoints, Weight, Wind
} from 'lucide-react';
import './App.css';

const losses = ['Неучтённые рейсы', 'Сливы топлива', 'Простои техники', 'Личные поездки', 'Нарушения скорости', 'Отсутствие аналитики'];

const directorValue = [
  ['Единая картина парка', 'Транспорт, топливо, маршруты и события в одном управленческом контуре.'],
  ['Диспетчерский контроль', 'Карта, статусы, тревоги и история движения доступны без задержек.'],
  ['Финансовая прозрачность', 'Каждый литр, час работы и отклонение превращаются в измеримый показатель.']
];

const industries = [
  ['Логистика', 'ETA · маршруты · простои'], ['Строительство', 'самосвалы · спецтехника · моточасы'],
  ['Пассажирские перевозки', 'рейсы · расписание · безопасность'], ['Сельское хозяйство', 'тракторы · комбайны · сезонные работы'],
  ['Международные перевозки', 'контейнеры · температура · границы'], ['Нефтегаз', 'цистерны · объекты · безопасность'],
  ['Курьерские службы', 'SLA · адреса · смены'], ['Производство', 'служебный транспорт · заявки']
];

const controls = [
  ['GPS', LocateFixed], ['GLONASS', Satellite], ['Топливо', Fuel], ['CAN', Activity], ['OBD', Gauge], ['Температура', Thermometer],
  ['Влажность', Droplets], ['Вес', Weight], ['Прицеп', Boxes], ['Видео', Video], ['ADAS', Eye], ['DMS', CircleDot],
  ['Тахограф', IdCard], ['Моточасы', Wind], ['Геозоны', Waypoints], ['АКБ', BatteryCharging], ['Двери', DoorOpen], ['RFID', Fingerprint]
];

const effects = [['до 30%', 'экономии топлива'], ['до 40%', 'меньше нецелевых рейсов'], ['до 25%', 'снижение простоев'], ['50+', 'управленческих отчётов']];

function Divider() {
  return <svg className="divider" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true"><path d="M0 54 C220 6 400 90 650 42 C910 -8 1110 28 1440 8 L1440 96 L0 96 Z" /></svg>;
}

function Title({ eyebrow, children, text }) {
  return <div className="title"><span>{eyebrow}</span><h2>{children}</h2>{text && <p>{text}</p>}</div>;
}

function FleetDashboard({ compact = false }) {
  const vehicles = [[18,62],[25,34],[36,52],[44,22],[51,71],[58,38],[68,58],[76,28],[84,66],[91,44]];
  return <div className={compact ? 'fleet-dashboard compact' : 'fleet-dashboard'}>
    <div className="dash-toolbar"><b>Fleet Command Center</b><span>132 assets online</span></div>
    <div className="dash-layout">
      <aside><b>Live map</b><small>Routes</small><small>Geofences</small><small>Fuel</small><small>Alerts</small></aside>
      <div className="pro-map">
        <svg viewBox="0 0 900 520" preserveAspectRatio="none">
          <path d="M-20 370 C110 295 180 410 300 305 S505 150 630 235 S760 430 930 310" />
          <path d="M-10 165 C145 105 205 260 355 185 S575 55 710 140 S790 295 925 215" />
          <polygon points="590,95 760,130 728,250 548,214" />
          <polygon points="110,245 255,205 315,310 164,356" />
        </svg>
        {vehicles.map((p, i) => <i key={i} style={{ left: `${p[0]}%`, top: `${p[1]}%` }}><Truck size={13} /></i>)}
        <div className="map-card primary"><b>KZ 482 LM</b><span>82 км/ч · Алматы → Астана</span></div>
        <div className="map-card secondary"><b>Geofence</b><span>Terminal East · 18 vehicles</span></div>
      </div>
      <div className="dash-panel"><strong>98.7%</strong><span>связь с парком</span><hr/><strong>−18%</strong><span>расход топлива</span><hr/><strong>24</strong><span>события за смену</span></div>
    </div>
  </div>;
}

function App() {
  return <main className="presentation">
    <section className="slide hero" id="top">
      <div className="hero-copy"><span className="kicker">Corporate fleet intelligence</span><h1>КОМПЛЕКСНЫЕ РЕШЕНИЯ<br/>GPS / ГЛОНАСС<br/>МОНИТОРИНГА ТРАНСПОРТА</h1><p>Премиальная телематическая платформа для руководителей, которым нужна полная прозрачность автопарка, топлива, активов и операционной эффективности.</p></div>
      <div className="hero-visual"><div className="truck-scene"><div className="skyline"/><div className="sat-lines"/><div className="road-glow"/><div className="rig"><span/><b/></div><div className="container-box"/><div className="data-chip chip-one">Live route · 924 km</div><div className="data-chip chip-two">Fuel anomaly · 0</div></div></div>
    </section>
    <Divider />

    <section className="slide dark"><Title eyebrow="Цена отсутствия контроля" text="Ключевые потери, которые современная телематика переводит в управляемую экономику.">Почему компании теряют деньги</Title><div className="loss-grid">{losses.map((x,i)=><article className="premium-card" key={x}><small>0{i+1}</small><b>{x}</b></article>)}</div></section>
    <Divider />

    <section className="slide"><Title eyebrow="Единый центр управления">Что получает руководитель</Title><div className="director-grid"><div className="control-room"><div className="screens"><FleetDashboard compact/><FleetDashboard compact/><FleetDashboard compact/></div><div className="operator-desk"/></div><div className="value-stack">{directorValue.map((x,i)=><article key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></div></section>
    <Divider />

    <section className="slide navy"><Title eyebrow="Профессиональная платформа">GPS мониторинг</Title><FleetDashboard/><div className="feature-row">{['Большая карта', 'Маршруты', 'Десятки автомобилей', 'Геозоны', 'Карточки техники', 'История движения'].map(x=><span key={x}>{x}</span>)}</div></section>
    <Divider />

    <section className="slide"><Title eyebrow="Телематика без ограничений">Что можно контролировать</Title><div className="control-grid">{controls.map(([label, Icon])=><article key={label}><Icon size={22}/><b>{label}</b></article>)}</div></section>
    <Divider />

    <section className="slide dark"><Title eyebrow="Отраслевые сценарии">Решения для любого масштаба бизнеса</Title><div className="industry-grid">{industries.map(x=><article key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>
    <Divider />

    <section className="slide split"><div><Title eyebrow="Топливо и эксплуатация">Контроль затрат</Title><p className="lead">Датчики, CAN, OBD и аналитика событий помогают быстро находить перерасход, сливы, простой и неэффективную эксплуатацию.</p><div className="metric-list"><span>заправки</span><span>сливы</span><span>моточасы</span><span>тахограф</span></div></div><div className="analytics-board"><div className="fuel-orb"><Fuel/><strong>−27%</strong><span>потенциал экономии</span></div><div className="bars">{[44,68,52,86,61,96,73,89,64,93,58,82].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></div></section>
    <Divider />

    <section className="slide navy"><Title eyebrow="Видео, ADAS и DMS">Безопасность в кадре</Title><div className="video-wall"><div className="camera-view main"><div className="lane"/><span>CAM 01 · HIGHWAY · LIVE</span></div>{['DMS · водитель', 'ADAS · дистанция', 'Cargo · контейнер', 'Rear · манёвр'].map(x=><div className="camera-view" key={x}><Video/><b>{x}</b></div>)}</div></section>
    <Divider />

    <section className="slide"><Title eyebrow="Экономический эффект">Результат на языке директоров</Title><div className="effect-grid">{effects.map(x=><article key={x[1]}><strong>{x[0]}</strong><span>{x[1]}</span></article>)}</div><p className="note">Фактический эффект зависит от дисциплины эксплуатации, масштаба автопарка и внедрённых сценариев контроля.</p></section>

    <section className="slide final"><span className="kicker">GLONASS NAVI · 2026</span><h2>Цифровой стандарт управления транспортом для компаний, которые считают каждую минуту, литр и рейс.</h2></section>
  </main>;
}

export default App;
