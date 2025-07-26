import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
export default function OfflineScreen({ children }) {
  const isOnline = useOnlineStatus();
  if (isOnline) {
    return children;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div>
            <FontAwesomeIcon
              icon={faWifi}
              className="text-red-400 text-6xl opacity-20"
            />
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <h2 className="text-2xl font-semibold">Connection Lost</h2>
            <p className="text-gray-400">
              oops! it look like you 've lost your internet connection
            </p>

            <div className="bg-primary-600/20 flex justify-between p-8">
              <div className="space-x-2 ">
                <FontAwesomeIcon icon={faWifi} />

                <span>Network connction</span>
              </div>
              <div>
                <span className="text-red-500">Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
