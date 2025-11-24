import PresaleUI from "./pages/PresaleUI";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex justify-end p-4">
        <appkit-button balance="hide" />
      </div>

      <PresaleUI />
    </div>
  );
}

export default App;
