import { useEffect, useRef, useState } from 'react';
import { sensorService } from '../../services/sensor.service';
import { createBarChart } from '../chart/initCharts';
import BarChart from '../chart/BarChat';
import { measurementService } from '../../services/measurement.service';
import { chartDataMaker } from '../chart/chart.dataMaker';
import BarchartHorizontal from '../chart/barChartHorizontal';
import { houseService } from '../../services/house.service';
import PieChart from '../chart/PieChart';
import AutoRefresh from '../../_helpers/AutoRefresh';

const AreaPlace = ({ areas, houseId }) => {
	const [totalConso, setTotalConso] = useState(0);
	const [dataByArea, setDataByArea] = useState({});
	const [showChart, setShowChart] = useState(null);
	const [listConsoArea, setListConsoArea] = useState({});
	const [house, setHouse] = useState({});
	const [TotalConsoArea, setTotalConsoArea] = useState({});
	const [refreshCount, setRefreshCount] = useState(0);
	useEffect(() => {
		houseService.getHouse(houseId).then(house => {
			setHouse(house.data.house);
		});

		const fetchData = async () => {
			const dataAllArea = await chartDataMaker.makeDataHouse(areas);
			setTotalConsoArea(dataAllArea);

			for (const area of areas) {
				const data = await ConsoArea(area.id);
				setTotalConso(prevTotalConso => prevTotalConso + data.data[0]);
				setListConsoArea(prevState => ({
					...prevState,
					[area.id]: data,
				}));
			}
		};

		fetchData();
	}, [areas, refreshCount]);

	async function ConsoArea(id) {
		const res = await chartDataMaker.makeDataConsoAllArea(id);

		return res;
	}

	async function consultSensors(id) {
		if (showChart !== id) {
			try {
				const data = await chartDataMaker.makeDatasensors(id);
				setDataByArea(prevState => ({
					...prevState,
					[id]: data,
				}));
				setShowChart(id);
			} catch (error) {}
		} else {
			setShowChart(null);
		}
	}
	function triggerRefresh() {
		setRefreshCount(count => count + 1);
	}

	return (
		<>
			<AutoRefresh intervalTime={15000} refreshFunction={triggerRefresh} />
			<div className="container">
				<h1 className="titleForm">{house.name}</h1>
				{<PieChart data={TotalConsoArea} />}
			</div>
			<div className="listAreas">
				{areas.map((area, i) => {
					return (
						<div key={i}>
							<div className="container">
								<h1 className="titleForm">{area.name}</h1>
								{!listConsoArea[area.id] && <p>Loading...</p>}
								{listConsoArea[area.id] && (
									<BarchartHorizontal
										maxX={totalConso}
										data={listConsoArea[area.id]}
									/>
								)}
								<button
									onClick={() => consultSensors(area.id)}
									className="buttonList"
								>
									{showChart !== area.id
										? 'Voir la répartition'
										: 'Cacher la répartition'}
								</button>
								{dataByArea[area.id]?.labels && showChart === area.id && (
									<>
										<BarChart data={dataByArea[area.id]} />
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default AreaPlace;
