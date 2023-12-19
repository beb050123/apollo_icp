import React from 'react';
import SideBar from '../components/SideBar';
import StockChart, { AreaProps } from '../components/StockChart'; // Import the StockChart component
import { AuthClient } from '@dfinity/auth-client';
import { Actor, ActorMethod, HttpAgent } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';
import { useAuth } from '../contexts/authContext';

export default function Home() {
  // Define the props for the StockChart component
  const auth = useAuth();
  const { login } = useAuth();
  const chartProps: AreaProps = {
    width: 300,
    height: 100,
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src="./assets/longlogo.png"
              className="object-cover py-6"
              height={'150'}
              width={'150'}
            ></img>
          </div>
          <div className="flex-grow flex justify-center"></div>
          {auth.isAuthenticated ? (
            <div></div>
          ) : (
            <button
              className="btn rounded bg-primary p-2 px-6 mr-4"
              onClick={login}
            >
              Login
            </button>
          )}
          <input
            className=" bg-gray-800 text-white h-10 p-4 pr-16 rounded-lg text-sm w-[300px] focus:outline-none"
            placeholder="Search"
          ></input>
        </div>

        <div className="flex flex-cols justify-center items-center gap-4 mb-10 ">
          <div className="flex flex-col justify-between p-4 shadow-lg min-w-[650px] min-h-[350px] max-w-[650px] max-h-[350px] mx-auto bg-base rounded-lg border sm:p-6 lg:p-8 border border-base-100 bg-gray-800 shadow-[5px_5px_0px_0px_rgba(255,107,0)] ">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Apollo Launch: Fractional Real Estate Investing on the Internet
                Computer
              </h5>
              <p className="mb-5 font-normal text-gray-400 dark:text-gray-400">
                Data driven real estate investing on the Internet Computer.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="text-white bg-base-100 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-primary dark:focus:ring-primary hover:cursor-pointer hover:bg-[#ff6b00] transition ease-in-out">
                View
              </button>
            </div>
          </div>
          <div className="mx-4 border-r-2 border-gray-300"></div>{' '}
          {/* Vertical Divider */}
          <div className="flex flex-col justify-between p-4 shadow-lg min-w-[650px] min-h-[350px] max-w-[650px] max-h-[350px] mx-auto bg-base rounded-lg border sm:p-6 lg:p-8 border border-base-100 bg-gray-800 shadow-[5px_5px_0px_0px_rgba(255,107,0)] ">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Apollo Launch: Fractional Real Estate Investing on the Internet
                Computer
              </h5>
              <p className="mb-5 font-normal text-gray-400 dark:text-gray-400">
                Data driven real estate investing on the Internet Computer.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="text-white bg-base-100 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-primary dark:focus:ring-primary hover:cursor-pointer hover:bg-[#ff6b00] transition ease-in-out">
                View
              </button>
            </div>
          </div>
        </div>
        <p className="text-4xl tracking-thinnest font-normal text-white py-4 ">
          Explore Markets
        </p>
        <div className="flex flex-cols gap-5">
          <button className="rounded rounded-lg btn text-white font-light px-4 py-2 w-[150px] border border-primary hover:cursor-pointer hover:bg-primary transition ease-in-out  ">
            Active
          </button>
          <button className="rounded rounded-lg btn text-white font-light px-4 py-2 w-[150px] border border-primary hover:cursor-pointer hover:bg-primary transition ease-in-out ">
            Coming Soon
          </button>
        </div>
        <div className="bg-gray-800 w-full h-full mt-10 p-4 rounded rounded-lg">
          <div>
            <StockChart {...chartProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
