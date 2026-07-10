import { stations } from '@/app/helpers/radio-helper';

import { RadioStation } from '../components/radio-station';


const RadioPlayer = () => {
    //to-do отрефакторить!
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">По многочисленным просьба Никиты - РАДИО!!!</h1>
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Stations:</h3>
                <div className="grid grid-cols-1 gap-2">
                    {stations.map((station) => (
                        <RadioStation station={station.id} key={station.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RadioPlayer;