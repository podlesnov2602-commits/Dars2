import React, { useEffect, useState } from 'react';
import {
  Activity, Bell, Boxes, Bus, ChevronDown, CircleCheck, Container, Fuel,
  Gauge, LocateFixed, Mail, Map, Menu, Play, Route, Satellite, ShieldCheck,
  Smartphone, Thermometer, Truck, Users, Video, X, Zap
} from 'lucide-react';
import './App.css';

const industries = [
  ['🚚','Логистика','Контроль доставки · ETA · Маршруты'],['🏗','Строительство','Экскаваторы · Самосвалы · Моточасы'],
  ['🚍','Пассажирские перевозки','Автобусы · Маршрутки · Школьный транспорт'],['🚜','Сельское хозяйство','Комбайны · Тракторы · Посев · Уборка'],
  ['🚛','Международные перевозки','Температура · Маршруты · Стоянки'],['🚓','Охранные компании','Группы реагирования · Время прибытия'],
  ['🚑','Медицина','Скорая помощь · Медицинские автомобили'],['🏭','Производство','Служебный транспорт'],
  ['🚖','Такси','Контроль смен и качества вождения'],['🚧','Дорожные службы','Спецтехника и выездные бригады'],
  ['📦','Курьерские службы','Доставка и контроль SLA'],['🛢','Нефтегаз','Цистерны · Топливо · Безопасность']
];
const losses = [['🚛','Неучтённые рейсы'],['⛽','Воровство топлива'],['⏳','Простои техники'],['🚦','Превышение скорости'],['👷','Личные поездки'],['📉','Отсутствие аналитики']];
const controls = ['GPS','GLONASS','Galileo','BeiDou','Датчик топлива','CAN-шина','Температура','Двери','Зажигание','Моточасы','OBD','Тахограф','Вес','Давление','Видео'];
const features = ['Онлайн карта','Все автомобили','Время работы','Расход топлива','Маршруты','Геозоны','История движения','Отчеты','Push уведомления','Мобильное приложение'];

function Title({eyebrow, children, text}) { return <div className="title"><span>{eyebrow}</span><h2>{children}</h2>{text && <p>{text}</p>}</div> }
function CheckList({items}) { return <div className="checks">{items.map(x=><div key={x}><CircleCheck size={18}/>{x}</div>)}</div> }
function MapVisual(){return <div className="mapvisual"><div className="map-grid"/><svg viewBox="0 0 700 370" preserveAspectRatio="none"><path d="M0 280 C100 240 90 80 220 120 S350 330 460 220 S570 70 700 120"/><path className="route2" d="M0 100 C160 200 220 20 360 130 S550 330 700 220"/></svg>{[[18,68],[31,33],[51,55],[67,27],[81,58]].map((p,i)=><i key={i} style={{left:p[0]+'%',top:p[1]+'%'}}><Truck size={15}/></i>)}<div className="map-pill"><span className="pulse"/> 24 объекта онлайн</div></div>}
function Chart({fuel=false}){return <div className={'chart '+(fuel?'fuel-chart':'')}><div className="chart-top"><span>{fuel?'Расход топлива':'Эффективность автопарка'}</span><b>{fuel?'1 248 л':'92%'}</b></div><div className="bars">{[40,65,48,82,55,91,70,95,76,88,62,93].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div><small>Данные обновлены только что</small></div>}

function App() {
 const [menu,setMenu]=useState(false); const [sent,setSent]=useState(false);
 useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('show')),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>o.observe(e));return()=>o.disconnect()},[]);
 const download=()=>{setSent(true);setTimeout(()=>setSent(false),3000)};
 return <main>
  <nav><a className="brand" href="#top"><span><Satellite/></span><b>GLONASS <em>NAVI</em></b></a><div className={'navlinks '+(menu?'open':'')}><a href="#solutions">Решения</a><a href="#platform">Платформа</a><a href="#benefits">Эффект</a><a href="#contacts">Контакты</a><button onClick={download}>Получить презентацию</button></div><button className="menub" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></nav>

  <section className="hero" id="top"><div className="orb o1"/><div className="orb o2"/><div className="hero-copy"><div className="tag"><i/> Спутниковый контроль нового поколения</div><h1>Ваш автопарк.<br/><span>Под полным контролем.</span></h1><p>Комплексные решения GPS/ГЛОНАСС мониторинга транспорта для прозрачного и эффективного бизнеса.</p><div className="hero-points"><b>Контроль транспорта.</b><b>Контроль топлива.</b><b>Контроль сотрудников.</b><b>Полная цифровизация.</b></div><button className="cta" onClick={download}>Получить презентацию PDF <span>↗</span></button></div><div className="hero-stage"><div className="radar"><div/><i/><i/><i/><span><Truck/></span></div><div className="floating f1"><small>Экономия топлива</small><b>−27.4%</b></div><div className="floating f2"><small>Транспорт онлайн</small><b>128 <em>/ 132</em></b></div><div className="floating f3"><Activity/><span><small>Статус системы</small><b>Все работает</b></span></div></div><a className="scroll" href="#losses">Листайте вниз <ChevronDown/></a></section>

  <section id="losses" className="section dark reveal"><Title eyebrow="Цена отсутствия контроля" text="Потери, которые можно превратить в прибыль">Почему компании теряют деньги</Title><div className="loss-grid">{losses.map((x,i)=><div className="loss" key={x[1]}><span>{x[0]}</span><b>{x[1]}</b><small>0{i+1}</small></div>)}</div><p className="note">По данным отрасли внедрение GPS-мониторинга позволяет сократить расход топлива, уменьшить простои и повысить прозрачность эксплуатации транспорта за счет контроля маршрутов, поведения водителей и технических параметров.</p></section>

  <section id="platform" className="section reveal"><Title eyebrow="Единый центр управления">Что получает руководитель</Title><div className="dashboard"><div className="dash-head"><b>GLONASS NAVI / Live</b><span>● Система работает</span></div><div className="dash-body"><aside>{['Обзор','Транспорт','Маршруты','Топливо','Отчеты'].map((x,i)=><div className={i===0?'active':''} key={x}>{x}</div>)}</aside><MapVisual/><div className="dash-stats"><b>132</b><small>всего объектов</small><hr/><b>128</b><small>сейчас в движении</small><hr/><b>98%</b><small>уровень связи</small></div></div></div><CheckList items={features}/></section>

  <section id="solutions" className="section navy reveal"><Title eyebrow="Для любого масштаба бизнеса">Отраслевые решения</Title><div className="industry-grid">{industries.map(x=><article key={x[1]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p><a href="#contacts">Подробнее →</a></article>)}</div></section>

  <section className="section reveal"><Title eyebrow="Телематика без ограничений">Что можно контролировать</Title><div className="control-grid">{controls.map((x,i)=><div key={x}>{[<LocateFixed/>,<Satellite/>,<Route/>,<Boxes/>,<Fuel/>,<Activity/>,<Thermometer/>,<ShieldCheck/>][i%8]}<b>{x}</b></div>)}</div></section>

  <section className="section split reveal"><div><Title eyebrow="Транспорт на ладони">GPS мониторинг</Title><p className="lead">Следите за каждым автомобилем в реальном времени. Полная история движения хранится в облаке.</p><CheckList items={['Скорость и пробег','Маршруты и остановки','Стоянки и нарушения','Геозоны','История и поиск автомобиля']}/></div><MapVisual/></section>

  <section className="section fuel reveal"><div className="fuel-art"><div className="tank"><Fuel/><strong>74%</strong><span>280 л</span></div><Chart fuel/></div><div><Title eyebrow="Самый быстрый возврат инвестиций">Контроль топлива</Title><p className="lead">Датчики высокой точности фиксируют каждую заправку и мгновенно определяют подозрительный слив.</p><CheckList items={['Заправки и сливы','Фактический расход','Остаток в баке','Средний расход','Отклонения от нормы']}/><div className="alert"><Bell/> Обнаружен слив: −42 л <small>12:48 · КамАЗ 5490</small></div></div></section>

  <section className="section navy reveal"><Title eyebrow="Безопасность в кадре">Видео мониторинг</Title><div className="video-grid"><div className="camera maincam"><div className="road"><div/><span>CAM 01 • LIVE</span></div></div>{['Салон водителя','Задняя камера','Грузовой отсек'].map((x,i)=><div className="camera" key={x}><Video/><b>{x}</b><small>CAM 0{i+2} • LIVE</small></div>)}</div><div className="mini-features"><b>ADAS</b><b>DMS</b><b>Запись</b><b>Онлайн просмотр</b><b>Архив</b></div></section>

  <section className="section reveal"><Title eyebrow="Ответственное вождение">Контроль водителей</Title><div className="driver"><div className="score"><small>Средний рейтинг парка</small><strong>8.7</strong><span>/ 10</span><div>↑ 12% за этот месяц</div></div><Chart/><CheckList items={['Нарушения','Резкие торможения','Разгоны','Превышение скорости','Холостой ход']}/></div></section>

  <section className="section compact navy reveal"><Title eyebrow="Специализированные сценарии">Контроль каждого актива</Title><div className="scenario-grid">{[['Выездные сотрудники','Курьеры · Монтажники · Инженеры · Торговые представители','👷'],['Спецтехника','Экскаваторы · Автокраны · Погрузчики · Бульдозеры','🏗'],['Автобусы','Расписание · Остановки · Маршруты · Опоздания','🚌'],['Рефрижераторы','Температура · Открытие дверей · Оповещения','❄️'],['Прицепы','Местоположение и сцепка','🚛'],['Контейнеры','Перемещения и простои','📦'],['Генераторы','Моточасы и топливо','⚡'],['Цистерны','Объем и безопасность','🛢']].map(x=><article key={x[0]}><span>{x[2]}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

  <section className="section split reveal"><div><Title eyebrow="Умные территории">Геозоны</Title><p className="lead">Создавайте зоны любой формы. Получайте событие в момент въезда, выезда или долгой остановки.</p><div className="notify"><b><Bell/> Мгновенные уведомления</b><span>Push</span><span>SMS</span><span>Telegram</span><span>Email</span></div></div><MapVisual/></section>

  <section className="section reveal"><Title eyebrow="Данные становятся решениями">Отчеты и аналитика</Title><div className="analytics"><div><span>Более</span><strong>50</strong><b>видов отчетов</b><p>От топлива до эффективности сотрудников. Настраивайте и выгружайте в один клик.</p></div><Chart/><Chart fuel/></div></section>

  <section className="section navy app-section reveal"><div><Title eyebrow="Офис всегда с вами">Мобильное приложение</Title><p className="lead">Контроль автопарка из любой точки мира. Все ключевые показатели, карта и уведомления в вашем смартфоне.</p><div className="store"><button> &nbsp; App Store</button><button>▶ &nbsp; Google Play</button></div></div><div className="phone"><div className="phone-head">GLONASS NAVI <span>•••</span></div><MapVisual/><div className="phone-stat"><b>24 в движении</b><span>3 на стоянке</span></div></div></section>

  <section className="section reveal"><Title eyebrow="Встраивается в ваш бизнес">Интеграции</Title><div className="integrations">{['1С','CRM','ERP','API','Excel'].map(x=><div key={x}>{x}</div>)}</div><div className="how"><Satellite/><i>→</i><div><LocateFixed/><span>GPS трекер</span></div><i>→</i><div><Activity/><span>SIM</span></div><i>→</i><div><Boxes/><span>Сервер</span></div><i>→</i><div><Map/><span>Платформа</span></div><i>→</i><Smartphone/></div></section>

  <section className="section navy reveal"><Title eyebrow="От идеи до результата">Этапы внедрения</Title><div className="steps">{['Анализ','Подбор оборудования','Монтаж','Настройка','Обучение','Поддержка'].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div></section>

  <section id="benefits" className="section reveal"><Title eyebrow="Измеримый результат">Экономический эффект</Title><div className="economy">{[['30%','экономии топлива'],['40%','снижения нецелевых поездок'],['25%','снижения простоев'],['50%','ускорения поиска транспорта']].map((x,i)=><div key={x[1]} style={{'--p':x[0]}}><strong>До {x[0]}</strong><span>{x[1]}</span></div>)}</div><p className="note">Показатели зависят от специфики бизнеса и дисциплины эксплуатации, но именно такие категории эффектов чаще всего достигаются при внедрении современных систем телематики.</p></section>

  <section className="section why navy reveal"><div><Title eyebrow="Ваш надежный партнер">Почему GLONASS NAVI</Title><CheckList items={['Более 10 лет опыта','Монтаж и поддержка','Обучение команды','Гарантия','Современная платформа','Мобильное приложение','Работаем по Казахстану']}/></div><div className="big-number"><span>10+</span><b>лет создаем<br/>технологии контроля</b></div></section>

  <section className="section reveal"><Title eyebrow="Нам доверяют">Наши клиенты</Title><div className="logos">{['QAZAQ OIL','BI GROUP','KAZ Minerals','AIR ASTANA','Қазпошта','ERG'].map(x=><b key={x}>{x}</b>)}</div><div className="quote"><p>“После внедрения мы увидели реальные маршруты и расход каждого автомобиля. Уже в первый месяц затраты на топливо снизились на 18%.”</p><span><b>Алексей М.</b> · Руководитель транспортного отдела</span></div></section>

  <section className="section navy reveal"><Title eyebrow="Все, что важно знать">Частые вопросы</Title><div className="faq">{[['Сколько занимает внедрение?','Обычно от 3 до 10 рабочих дней — в зависимости от размера автопарка.'],['Работает ли система за пределами Казахстана?','Да, оборудование работает по всему миру, где доступна сотовая связь.'],['Можно ли подключить уже установленные трекеры?','Да, платформа поддерживает большинство популярных моделей оборудования.'],['Есть ли техническая поддержка?','Да, специалисты GLONASS NAVI сопровождают вас на всех этапах.']].map(x=><details key={x[0]}><summary>{x[0]}<b>+</b></summary><p>{x[1]}</p></details>)}</div></section>

  <section id="contacts" className="final reveal"><div><span className="tag">Начните экономить уже сегодня</span><h2>Возьмите автопарк<br/><em>под полный контроль.</em></h2><p>Оставьте заявку — подготовим расчет экономии и персональную демонстрацию системы.</p></div><form onSubmit={e=>{e.preventDefault();setSent(true)}}><input required placeholder="Ваше имя"/><input required type="tel" placeholder="+7 (___) ___-__-__"/><input placeholder="Компания и количество авто"/><button className="cta">Получить консультацию ↗</button><small>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</small></form></section>
  <footer><a className="brand" href="#top"><span><Satellite/></span><b>GLONASS <em>NAVI</em></b></a><p>GPS/ГЛОНАСС мониторинг транспорта · Казахстан</p><p>© 2026 GLONASS NAVI</p></footer>
  {sent&&<div className="toast"><CircleCheck/> Спасибо! Презентация готовится к отправке.</div>}
 </main>
}
export default App;
