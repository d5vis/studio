import Card from "../components/card";
import Recorder from "./components/recorder";
import Script from "./components/script";

const RecordPage = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 w-full h-full">
      <Card>
        <Recorder />
      </Card>
      <Card>
        <Script />
      </Card>
    </div>
  );
};

export default RecordPage;
