import React from 'react'
import Sliders from './Sliders';
import { AppDispatch, RootState } from './store';
import { useDispatch, useSelector } from "react-redux";
import { setBue, setPhone, setRent, setSocialsSum } from './store/rootSlice';

function App() {

  const dispatch: AppDispatch = useDispatch();

  const { minutes, internet } = useSelector((state: RootState) => state.rootSlice);
  const [phoneValue, setPhoneValue] = React.useState<string>('');
  const [operatorValue, setOperatorValue] = React.useState<string>('МТС');
  const [rentValue, setRentValue] = React.useState<boolean>(false);
  const [buyValue, setBuyValue] = React.useState<boolean>(false);

  const [socialNetwork, setSocialNetwork] = React.useState([
    { icon: '/facebook.png', price: 20, checked: false },
    { icon: '/vk.png', price: 20, checked: false },
    { icon: '/odnoklassniki.png', price: 20, checked: false },
    { icon: '/instagram.png', price: 60, checked: false },
    { icon: '/tiktok.png', price: 60, checked: false },
  ]);

  const handleActiveSocials = (item: { icon: string; price: number; checked: boolean; }) => {
    const newSocialNetwork = socialNetwork.map((social) => {
      if (social.icon === item.icon) {
        social.checked = !social.checked;
      }
      return social;
    });
    setSocialNetwork(newSocialNetwork);
  }

  const socialNetworkSum = socialNetwork.reduce((acc, item) => {
    if (item.checked) {
      acc += item.price;
    }
    return acc;
  }, 0);


  const [sum, setSum] = React.useState<number>(0);

  const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
  const isValid = phoneRegex.test(phoneValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (isValid) {
      dispatch(setPhone(phoneValue))
      dispatch(setBue(buyValue))
      dispatch(setRent(rentValue))
      dispatch(setSocialsSum(socialNetworkSum))

      alert(JSON.stringify({
        phone: phoneValue,
        operator: operatorValue,
        minutes,
        internet,
        rentValue,
        buyValue,
        socialsSum: socialNetworkSum,
        total: sum,
      }));
    }
  }

  React.useEffect(() => {
    const newSum = minutes + internet + socialNetworkSum + (rentValue ? 99 : 0) + (buyValue ? 2600 : 0);
    setSum(newSum);
  }, [minutes, internet, socialNetworkSum, rentValue, buyValue]);


  return (
    <main>
      <h1>Настройте тариф</h1>

      <form onSubmit={handleSubmit} action="submit">

        <div className="operator">
          <h3> Телефон</h3>
          <input style={{ border: !isValid ? '1px solid red' : '' }} value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} type="tel" id="phone" name="phone" placeholder="+7 (___) ___-__-__" />
          <p>


            {!isValid ? <span style={{ color: 'red' }}> Неверный формат</span> : 'Обязательное поле'}
          </p>
        </div>

        <div className="operator">
          <h3>Оператор</h3>
          <select onChange={(e) => setOperatorValue(e.target.value)} name="operator" id="operator">
            <option value="mts">МТС</option>
            <option value="beeline">Билайн</option>
            <option value="megafon">Мегафон</option>
          </select>
        </div>

        <div className="minutes">
          <h3>Минуты</h3>
          <Sliders marks={{
            200: '200',
            350: '350',
            600: '600',
            650: '650',
          }} color="#7A5CFA" type="minutes" />
        </div>

        <div className="internet">
          <h3>Интернет</h3>
          <Sliders marks={{
            5: '5',
            15: '15',
            30: '30',
            35: '35',
          }} color='#000000' type="internet" />
        </div>


        <div>
          <h3>Wifi роутер</h3>

          <div className='wifi'>
            <input onClick={() => setRentValue(!rentValue)} type="checkbox" id="wifi" name="wifi" />
            <label htmlFor="wifi">Аренда <span style={{ fontWeight: 'bold' }}>99</span> ₽/месяц</label>
          </div>

          <div className='wifi'>
            <input onClick={() => setBuyValue(!buyValue)} type="checkbox" id="wifi" name="wifi" />
            <label htmlFor="wifi">Выкупить <span style={{ fontWeight: 'bold' }}>2 600</span> ₽</label>
          </div>
        </div>

        <h3>Соцсети</h3>

        <div className='socialNetwork'>
          {
            socialNetwork.map((item, index) => (
              <div onClick={() => handleActiveSocials(item)} className={item.checked ? 'socials active' : 'socials'} key={index}>
                <img src={item.icon} alt="" />
                <p>{item.price} ₽</p>
              </div>
            ))
          }
        </div>

        <button className='submit' type='submit' >
          <span style={{ fontWeight: 'bold' }}>{sum}</span> ₽ в месяц
        </button>
      </form>
    </main>
  )
}

export default App
