import PrayerWall from "./pages/Prayer Wall/PrayerWall";
import Answered from "./pages/Answered/Answered";
import Testimonies from "./pages/Testimonies/Testimonies";
import Profile from "./pages/Profile/Profile";
import Setting from "./pages/Setting/Setting"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrayerWall />} />
          <Route path="/answered" element={<Answered />} />
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;