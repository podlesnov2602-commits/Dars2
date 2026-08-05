import React from 'react';
import {
  Activity, Battery, Bell, Camera, CircleCheck, Container, Droplets,
  Fuel, Gauge, IdCard, LocateFixed, LockKeyhole, Map, MapPin, Radar,
  Satellite, ShieldCheck, Smartphone, Thermometer, Truck,
  Video, Weight, Wifi
} from 'lucide-react';
import './App.css';

const losses = ['Неучтённые рейсы', 'Сливы топлива', 'Простои техники', 'Нарушения скорости', 'Личные поездки', 'Нет аналитики'];
const features = ['Единая карта транспорта', 'Топливо и CAN-данные', 'Маршруты и геозоны', 'Видео и безопасность', 'Отчеты для директора'];
const industries = [
  ['Логистика', 'ETA · маршруты · SLA'], ['Строительство', 'Моточасы · спецтехника'],
  ['Пассажирские перевозки', 'Расписание · безопасность'], ['Агро', 'Сезонная техника · топливо'],
  ['Международные перевозки', 'Контейнеры · границы'], ['Нефтегаз', 'Цистерны · риск-контроль'],
  ['Курьерские службы', 'Доставка · статусы'], ['Производство', 'Служебный транспорт']
];
const controls = [
  ['GPS', LocateFixed], ['GLONASS', Satellite], ['Топливо', Fuel], ['CAN', Activity], ['OBD', Gauge], ['Температура', Thermometer],
  ['Влажность', Droplets], ['Вес', Weight], ['Прицеп', Container], ['Видео', Video], ['ADAS', ShieldCheck], ['DMS', Camera],
  ['Тахограф', LockKeyhole], ['Моточасы', Gauge], ['Геозоны', MapPin], ['АКБ', Battery], ['Двери', Wifi], ['RFID', IdCard]
];
const clients = ['Alfa Lombard', 'ГЦИ', 'VECTOR 7', 'BARON', 'K-S', 'amiran', 'Clean House'];

function Title({ eyebrow, children, text }) {
  return <div className="title"><span>{eyebrow}</span><h2>{children}</h2>{text && <p>{text}</p>}</div>;
}
function Divider() { return <div className="divider" aria-hidden="true"><svg viewBox="0 0 1200 72"><path d="M0 36H432L464 8L496 64L528 36H1200"/><path d="M0 52H358L390 30H1200"/></svg></div>; }
function CheckList({ items }) { return <div className="checks">{items.map(x => <div key={x}><CircleCheck size={18}/><b>{x}</b></div>)}</div>; }
function FleetPhoto({ compact=false }) { return <div className={compact ? 'fleet-photo compact-photo' : 'fleet-photo'}><div className="photo-grid"/><div className="control-wall">{Array.from({length: 9}).map((_, i) => <i key={i}/>)}</div><div className="map-lines"><svg viewBox="0 0 620 360"><path d="M10 250C120 90 210 310 322 155S500 90 610 210"/><path d="M20 110C150 210 225 70 340 140S500 285 612 125"/></svg>{[18,33,48,66,78].map((x,i)=><span key={i} style={{left:`${x}%`,top:`${[58,34,48,31,54][i]}%`}}><Truck size={14}/></span>)}</div><div className="photo-caption"><b>Control Center</b><small>132 объекта · 98% online</small></div></div>; }
function Chart() { return <div className="chart"><div><span>Эффективность</span><b>92%</b></div><p>{[42,68,54,82,61,94,72,88,79,96,64,90].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</p></div>; }

function App() {
  return <main>
    <section className="hero" id="top">
      <div className="hero-copy"><div className="tag">Корпоративная презентация · GPS/ГЛОНАСС</div><h1>Цифровой контроль автопарка для руководителей.</h1><p>GLONASS NAVI объединяет транспорт, топливо, водителей, видео и аналитику в единый управленческий контур.</p><div className="hero-metrics"><div><strong>до 30%</strong><span>экономии топлива</span></div><div><strong>24/7</strong><span>контроль активов</span></div><div><strong>10+</strong><span>лет экспертизы</span></div></div></div>
      <div className="hero-image" role="img" aria-label="Современный европейский тягач с контейнером на ночной трассе, город, неон, спутниковые линии и цифровая сетка"><div className="city"/><div className="data-lines"/><div className="road-perspective"/><div className="truck-render"><span className="cab"/><span className="container"/><span className="wheel w1"/><span className="wheel w2"/><span className="wheel w3"/></div><div className="satellite-arc"/></div>
    </section>
    <Divider/>

    <section className="section dark"><Title eyebrow="Цена отсутствия контроля" text="Шесть зон риска, которые ежедневно влияют на EBITDA.">Почему компании теряют деньги</Title><div className="loss-grid">{losses.map((x,i)=><article className="loss" key={x}><small>0{i+1}</small><b>{x}</b></article>)}</div></section>
    <Divider/>

    <section className="section executive"><div><Title eyebrow="Единый центр управления">Что получает руководитель</Title><p className="lead">Дорогая, понятная картина бизнеса: где техника, сколько топлива, кто нарушает регламенты и какие активы требуют внимания.</p><CheckList items={features}/></div><FleetPhoto/></section>
    <Divider/>

    <section className="section navy"><Title eyebrow="Для любого масштаба бизнеса">Отраслевые решения</Title><div className="industry-grid">{industries.map(x=><article key={x[0]}><b>{x[0]}</b><p>{x[1]}</p></article>)}</div></section>
    <Divider/>

    <section className="section"><Title eyebrow="Телематика без ограничений">Что можно контролировать</Title><div className="control-grid">{controls.map(([label,Icon])=><article key={label}><Icon size={24}/><b>{label}</b></article>)}</div></section>
    <Divider/>

    <section className="section split"><div><Title eyebrow="Транспорт на ладони">GPS мониторинг</Title><p className="lead">Онлайн-карта, история маршрутов, скорость, остановки и отклонения — без лишнего шума.</p><CheckList items={['Скорость и пробег','Маршруты и остановки','Геозоны','История движения']}/></div><FleetPhoto compact/></section>
    <Divider/>

    <section className="section fuel"><div className="fuel-panel"><div className="tank"><Fuel/><strong>74%</strong><span>остаток</span></div><Chart/></div><div><Title eyebrow="Самый быстрый возврат инвестиций">Контроль топлива</Title><p className="lead">Датчики фиксируют заправки, расход, остаток и подозрительные сливы.</p><div className="alert"><Bell/> Событие: отклонение −42 л · КамАЗ 5490</div></div></section>
    <Divider/>

    <section className="section navy"><Title eyebrow="Безопасность в кадре">Видео мониторинг</Title><div className="video-grid"><div className="maincam"><span>CAM 01 · LIVE</span></div>{['Салон водителя','Задняя камера','Грузовой отсек'].map(x=><article className="camera" key={x}><Video/><b>{x}</b></article>)}</div><div className="mini-features"><b>ADAS</b><b>DMS</b><b>Архив</b><b>Онлайн просмотр</b></div></section>
    <Divider/>

    <section className="section app-section"><div><Title eyebrow="Офис всегда с вами">Мобильное приложение</Title><p className="lead">Внутри телефона — не шаблонная карта, а управленческий экран: статус парка, тревоги, маршруты и KPI.</p></div><div className="phone"><div className="phone-head">GLONASS NAVI <span>LIVE</span></div><div className="phone-screen"><FleetPhoto compact/><div className="phone-kpis"><b>24 в движении</b><span>3 тревоги · 98% связь</span></div></div></div></section>
    <Divider/>

    <section className="section navy"><Title eyebrow="CAPEX или OPEX">Покупка и аренда оборудования</Title><div className="rent-grid"><article><b>Покупка</b><p>Оборудование на балансе компании, гарантия, монтаж и поддержка.</p></article><article><b>Аренда</b><p>Быстрый запуск без капитальных затрат: трекеры, датчики и видеотерминалы по подписке.</p></article><article><b>Сервис</b><p>Подбор, установка, обучение, сопровождение и развитие системы.</p></article></div></section>
    <Divider/>

    <section className="section"><Title eyebrow="Измеримый результат">Экономический эффект</Title><div className="economy">{[['До 30%','экономии топлива'],['До 40%','меньше нецелевых поездок'],['До 25%','снижения простоев'],['До 50%','быстрее поиск транспорта']].map(x=><article key={x[1]}><strong>{x[0]}</strong><span>{x[1]}</span></article>)}</div></section>
    <Divider/>

    <section className="section clients"><Title eyebrow="Нам доверяют">Наши клиенты</Title><div className="logos">{clients.map(x=><b key={x}>{x}</b>)}</div></section>
    <Divider/>

    <section id="contacts" className="section contacts navy"><div><Title eyebrow="Контакты">GLONASS NAVI</Title><p className="lead">GPS/ГЛОНАСС мониторинг транспорта, контроль топлива, видео, мобильное приложение, покупка и аренда оборудования.</p></div><div className="contact-card"><p><Satellite/> Казахстан</p><p><Map/> Внедрение под ключ</p><p><Smartphone/> Поддержка и обучение</p><p><Radar/> Демонстрация платформы</p></div></section>
    <footer>© 2026 GLONASS NAVI · Корпоративная презентация</footer>
  </main>;
}
export default App;
