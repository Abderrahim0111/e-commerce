const Footer = () => {
  return (
    <footer className=" mt-20 bg-slate-700 absolute left-0 right-0 px-10 pt-10 pb-2 text-white">
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
      </footer>
  );
};

export default Footer;
