const Header = () => {
  return (
    <div className="border-b-[1px] p-5 flex flex-row gap-5 justify-between mb-5">
      <div>
        <a href="#about">Yeabsira Driba</a>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <a href="/">Home</a>
        </div>
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
