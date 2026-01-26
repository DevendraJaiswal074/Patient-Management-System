import React from "react";

function Navbar() {
  return (
    <div className="w-full">
      <div className="bg-[#3475b9] text-white py-3 flex justify-center items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="fill-white w-8"
        >
          <path d="M320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72zM380 384.8C374.6 384.3 369 384 363.4 384L276.5 384C270.9 384 265.4 384.3 259.9 384.8L259.9 452.3C276.4 459.9 287.9 476.6 287.9 495.9C287.9 522.4 266.4 543.9 239.9 543.9C213.4 543.9 191.9 522.4 191.9 495.9C191.9 476.5 203.4 459.8 219.9 452.3L219.9 393.9C157 417 112 477.6 112 548.6C112 563.7 124.3 576 139.4 576L500.5 576C515.6 576 527.9 563.7 527.9 548.6C527.9 477.6 482.9 417.1 419.9 394L419.9 431.4C443.2 439.6 459.9 461.9 459.9 488L459.9 520C459.9 531 450.9 540 439.9 540C428.9 540 419.9 531 419.9 520L419.9 488C419.9 477 410.9 468 399.9 468C388.9 468 379.9 477 379.9 488L379.9 520C379.9 531 370.9 540 359.9 540C348.9 540 339.9 531 339.9 520L339.9 488C339.9 461.9 356.6 439.7 379.9 431.4L379.9 384.8z" />
        </svg>
        <p className="text-center text-2xl font-bold">
          Paient Management System
        </p>
      </div>

      <div className="flex justify-center items-center gap-20 py-2 border-b border-black/20">
        {/* Total Paitent */}
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-[#3475b9] w-6"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          <p className="font-bold">
            Total Paitent Today: <span className="font-normal">70</span>
          </p>
        </div>

        {/* Checked out */}
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-green-600 w-6"
          >
            <path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 260Zm0-340Z" />
          </svg>
          <p className="font-bold">
            Checked Out: <span className="font-normal">40</span>
          </p>
        </div>

        {/* Checked in */}
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-[#3475b9] w-6"
          >
            <path d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440h14q-11 18-16.5 38.5T472-360q-54 1-107.5 14.5T260-306q-9 5-14.5 14t-5.5 20v32h283l80 80H160Zm320-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm236 480L576-300q-13-13-18.5-28t-5.5-30q0-32 23-57t59-25q28 0 44 13t38 35q20-20 36.5-34t45.5-14q37 0 59.5 25.5T880-357q0 15-6 30t-18 27L716-160Z" />
          </svg>
          <p className="font-bold">
            Checked in: <span className="font-normal">30</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
