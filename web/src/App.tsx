import "./styles/global.css";
import "./lib/dayjs";

import SummaryTable from "./components/SummaryTable";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background text-white">
            <div className="flex w-full max-w-5xl flex-col items-center gap-16 px-6">
                <Header />
                <SummaryTable />
                <Footer />
            </div>
        </div>
    );
};

export default App;
