import {
  IconHome,
  IconCreditCard,
  IconActivity,
  IconInbox,
  IconDatabase,
  IconSettings,
  IconHelp,
  IconEyeCog,
} from '@tabler/icons-react';

const SideBar = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex items-center justify-center h-[61px] border-b border-gray-700 ">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src="./assets/longlogo.png"
            className="object-cover"
            height={'100'}
            width={'100'}
          ></img>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto text-white ">
        <a
          className="flex items-center px-4 py-2 text-white hover:cursor-pointer hover:bg-[#ff6b00] transition ease-in-out  "
          href=""
        >
          <IconHome className="w-5 h-5 mr-3 text-gray-400 " />
          Dashboard{'\n                      '}
        </a>
        <a
          className="flex items-center px-4 py-2 text-white hover:cursor-pointer hover:bg-[#ff6b00] transition ease-in-out"
          href=""
        >
          <IconHome className="w-5 h-5 mr-3 text-gray-400" />
          Invest{'\n                      '}
        </a>
      </nav>
      <div className="flex items-center justify-between px-4 h-16 border-t border-gray-700">
        <div className="flex items-center">
          <img alt="Bryan Cranston" src="/placeholder.svg?height=32&width=32" />
          <span className="ml-3 text-sm font-medium text-gray-400">
            Blake Baker
          </span>
        </div>
        <IconEyeCog className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SideBar;
