import React, { useState } from 'react';
import axios from 'axios';

const CLIMATIQ_API_KEY = '4T8QZ62NW10R17EYJ6RX9GR248'; 


interface CO2Response {
  co2e: number;
  co2e_unit: string;
  activity_data: {
    activity_value: number;
    activity_unit: string;
  };
  emission_factor: {
    name: string;
    source: string;
    year: number;
    region: string;
  };
}

const calculateElectricityCO2 = async (
  energy: number,
  energyUnit: string
): Promise<CO2Response | null> => {
  try {
    const response = await axios.post<CO2Response>(
      `https://api.climatiq.io/data/v1/estimate`,
      {
        emission_factor: {
          activity_id: 'electricity-supply_grid-source_residual_mix',
          data_version: '^6',
        },
        parameters: {
          energy: energy,
          energy_unit: energyUnit,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error calculating electricity CO2 emissions:', error);
    return null;
  }
};

const CO2Calculator: React.FC = () => {
  const [energy, setEnergy] = useState('');
  const [energyUnit, setEnergyUnit] = useState('kWh');
  const [electricityResult, setElectricityResult] = useState<CO2Response | null>(null);
  const [electricityError, setElectricityError] = useState<string | null>(null);

  const handleElectricityCalculate = async () => {
    if (!energy.trim()) {
      setElectricityError('Please enter the energy consumption.');
      return;
    }
    setElectricityError(null);
    const result = await calculateElectricityCO2(Number(energy), energyUnit);
    if (result) {
      setElectricityResult(result);
    } else {
      setElectricityError('An error occurred while calculating electricity CO2 emissions.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Electricity CO2 Calculator</h1>
      <input
        type="text"
        value={energy}
        onChange={(e) => setEnergy(e.target.value)}
        placeholder="Enter energy consumption..."
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <select
        value={energyUnit}
        onChange={(e) => setEnergyUnit(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4"
      >
        <option value="kWh">kWh</option>
        <option value="MWh">MWh</option>
      </select>
      <button
        onClick={handleElectricityCalculate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate
      </button>
      {electricityError && <p className="text-red-500 mt-2">{electricityError}</p>}
      {electricityResult && (
        <div className="mt-4 p-4 bg-white rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">CO2 Emissions</h2>
          <p className="text-lg text-gray-700">
            Energy Consumption: {electricityResult.activity_data.activity_value}{' '}
            {electricityResult.activity_data.activity_unit}
          </p>
          <p className="text-lg text-gray-700">
            Emission Factor: {electricityResult.emission_factor.name} (
            {electricityResult.emission_factor.region}, {electricityResult.emission_factor.year})
          </p>
          <p className="text-lg text-gray-700">
            CO2 Emissions: {electricityResult.co2e} {electricityResult.co2e_unit}
          </p>
        </div>
      )}
    </div>
  );
};

export default CO2Calculator;