const Footer = () => {
  return (
    <footer className=" mt-20 absolute left-0 right-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180"><path fill="#334154" fillOpacity="1" d="M0,32L80,58.7C160,85,320,139,480,160C640,181,800,171,960,149.3C1120,128,1280,96,1360,80L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    <div className=" mt-[-2px] bg-slate-700  px-10 pt-10 pb-2 text-white">
        <div className=" flex flex-col items-center mb-10">
          <h1 className=" font-bold text-2xl">Why choose us?</h1>
          <p className=" opacity-80">Customer satisfaction is our priority</p>
        </div>
        <ul className=" flex justify-evenly gap-8 sm:gap-10 items-center">
          <li className=" flex flex-col items-center"><i className=" text-2xl mb-2  fa-solid fa-truck" /><span className=" font-bold text-lg">Delivery</span><span className=" opacity-80">Free shipping for some products</span></li>
          <li className=" sm:border h-28 opacity-80"></li>
          <li className=" flex flex-col items-center"><i className=" text-2xl mb-2  fa-solid fa-user" /><span className=" font-bold text-lg">Sypport 24/7</span><span className=" opacity-80">Contact us 24hours a day. 7days a week</span></li>
          <li className=" sm:border h-28 opacity-80"></li>
          <li className=" flex flex-col items-center"><i className=" text-2xl mb-2  fa-solid fa-credit-card" /><span className=" font-bold text-lg">100% Payment secure</span><span className=" opacity-80">We ensure secure payment</span></li>
        </ul>
        <p className=" text-center mt-16">© 2023 Boutiquti. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
