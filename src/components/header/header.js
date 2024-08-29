const Header = () => {
  return (
    <div className="border-b-[1px] py-5 px-12 flex flex-row gap-8 justify-between mb-5">
      <div className="text-2xl">
        <a href="/">Yeabsira Driba</a>
      </div>
      <div className="flex flex-row justify-between space-x-5">
        <div>
          <a href="#about">About</a>
        </div>
        <div>
          <a href="#projects">Projects</a>
        </div>
        <div>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
