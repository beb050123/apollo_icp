import { useEffect, useRef, useState } from 'react';

export default function Mint() {
  const Card = ({
    cityName,
    cityImage,
    cityDescription,
    cityId,
  }: {
    cityName: string;
    cityImage: string;
    cityDescription: string;
    cityId: number;
  }) => {
    const [selected, setSelected] = useState('5 ICP');

    return (
      <div className="card w-full sm:w-96 glass bg-base-100  transition-transform duration-500 ease-in-out transform shadow-2xl hover:scale-105 hover:shadow-primary ">
        <figure className="h-64 overflow-hidden">
          <img
            src={cityImage}
            alt="Shoes"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-white">{cityName}</h2>
          <p className="h-24">{cityDescription}</p>
          <div className="card-actions justify-end">
            <button
              className="btn bg-primary text-base-100"
              onClick={() => document.getElementById(`${cityId}`).showModal()}
            >
              Select
            </button>
          </div>
        </div>
        <dialog id={`${cityId}`} className="modal bg-base-100 bg-opacity-80">
          <div className="modal-box bg-primary">
            <div className="join flex justify-between">
              <h3 className="font-black tracking-thinnest text-xl text-base-100 ">
                Mint - {cityName}
              </h3>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm bg-base-100 text-white">
                    X
                  </button>
                </form>
              </div>
            </div>

            <div className=" gap-4 items-center justify-center">
              <div className="py-4">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-base-100 font-bold">
                      Deposit
                    </span>
                  </div>
                  <select
                    className="select font-bold bg-base-100 px-4 min-w-full text-white font-bold "
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    <option>5 ICP</option>
                    <option>10 ICP</option>
                    <option>20 ICP</option>
                    <option>50 ICP</option>
                    <option>100 ICP</option>
                  </select>
                </label>
              </div>
              <div className="label">
                <span className="label-text text-base-100 font-bold">
                  Tokens
                </span>
              </div>
              <div className="bg-base-100 rounded-lg px-4 py-3 text-white font-bold ">
                {Number(selected.split(' ')[0]) / 0.0001} Tokens
              </div>
            </div>
            <div className="flex justify-between py-4">
              <div></div>

              <button className="btn  text-primary shadow-xl  shadow-base-100 ">
                Mint
              </button>
            </div>
          </div>
        </dialog>
      </div>
    );
  };

  const Countdown = ({ targetDate }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = Math.max((targetDate - now) / 1000, 0); // difference in seconds

        const days = Math.floor(diff / 60 / 60 / 24);
        const hours = Math.floor(diff / 60 / 60) % 24;
        const mins = Math.floor(diff / 60) % 60;

        setDays(days);
        setHours(hours);
        setMins(mins);
      }, 1000);

      return () => clearInterval(interval);
    }, [targetDate]);

    return (
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="text-primary font-mono text-5xl">
            <span>{days}</span>
          </span>
          days
        </div>
        <div className="flex flex-col">
          <span className="text-primary font-mono text-5xl">
            <span> {hours}</span>
          </span>
          hours
        </div>
        <div className="flex flex-col">
          <span className="text-primary font-mono text-5xl">
            <span>{mins}</span>
          </span>
          min
        </div>
      </div>
    );
  };

  const cards = [
    {
      cityName: 'Baltimore, MD',
      cityImage:
        'https://i.redd.it/inner-harbor-lit-up-at-night-v0-cx06yw8di73b1.jpg?s=aef68e78a42f2afa274b08c287f6f39ce73957a4',
      cityDescription:
        'The city of Baltimore isis an up and coming tech hub, and one of the most affordable cities in the US.',
      cityId: 1,
    },
    {
      cityName: 'Dallas, TX',
      cityImage:
        'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx.jpg',
      cityDescription:
        'The city of Baltimore is the largest city in the state of Maryland. It is a major seaport and is also known for its beautiful harbor.',
      cityId: 2,
    },
    {
      cityName: 'Miami, FL',
      cityImage:
        'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/471000/471674-Miami.jpg',
      cityDescription:
        'The city of Baltimore is the largest city in the state of Maryland. It is a major seaport and is also known for its beautiful harbor.',
      cityId: 3,
    },
    {
      cityName: 'Boston, MA',
      cityImage:
        'https://www.extraspace.com/blog/wp-content/uploads/2018/10/living-in-boston-ma.jpg',
      cityDescription:
        'The city of Baltimore is the largest city in the state of Maryland. It is a major seaport and is also known for its beautiful harbor.',
      cityId: 4,
    },
  ];

  const targetDate = new Date('2024-01-31T00:00:00');
  targetDate.setDate(targetDate.getDate() + 1); // set target date to 1 day in the future

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center justify-center">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src="./assets/longlogo.png"
            className="object-cover py-6"
            height={'200'}
            width={'200'}
          ></img>
        </div>
      </div>
      <div className="flex justify-center items-center pb-20 ">
        <Countdown targetDate={targetDate} />
      </div>

      <div className="flex flex-row sm:flex-row justify-between items-center  rounded rounded-lg gap-4 mb-10 p-6 ">
        {cards.map((card) => (
          <Card key={card.cityId} {...card} />
        ))}
      </div>
    </div>
  );
}
