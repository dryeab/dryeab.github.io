import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="text-gray-700 relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 text-center flex flex-col items-center justify-center -mt-32 text-xl">
        <div>It is getting updated. Please come back later.</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
