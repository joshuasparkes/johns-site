import { useState, useEffect } from 'react';
import './App.css';

function Modal({ data, title, onClose }) {
  const ageRanges = ['18-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51+'];
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="age-breakdown">
          <table className="age-table">
            <thead>
              <tr>
                <th>Age Range</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {ageRanges.map(range => (
                <tr key={range}>
                  <td>{range}</td>
                  <td>{data[range]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BeerFact({ fact }) {
  return (
    <div className="beer-fact animate-fade-in">
      <div className="beer-mug">🍺</div>
      <p>{fact}</p>
    </div>
  );
}

function App() {
  const [selectedStat, setSelectedStat] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const beerFacts = [
    "Guinness was first brewed in 1759 by Arthur Guinness",
    "The perfect pint of Guinness should take 119.5 seconds to pour",
    "Guinness' distinctive color is actually a very dark ruby red",
    "Until 1988, Guinness used fish bladders in their brewing process",
    "Over 10 million glasses of Guinness are sold every day",
    "The famous Guinness bubbles actually sink instead of rise"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % beerFacts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Sample demographic data with age breakdown
  const demographicData = {
    ageGroups: [
      { 
        range: '21-30', 
        percentage: 25,
        ageBreakdown: {
          '18-20': 0,
          '21-25': 15,
          '26-30': 10,
          '31-35': 0,
          '36-40': 0,
          '41-45': 0,
          '46-50': 0,
          '51+': 0
        }
      },
      { 
        range: '31-40', 
        percentage: 35,
        ageBreakdown: {
          '18-20': 0,
          '21-25': 0,
          '26-30': 0,
          '31-35': 20,
          '36-40': 15,
          '41-45': 0,
          '46-50': 0,
          '51+': 0
        }
      },
      { 
        range: '41-50', 
        percentage: 25,
        ageBreakdown: {
          '18-20': 0,
          '21-25': 0,
          '26-30': 0,
          '31-35': 0,
          '36-40': 0,
          '41-45': 15,
          '46-50': 10,
          '51+': 0
        }
      },
      { 
        range: '51+', 
        percentage: 15,
        ageBreakdown: {
          '18-20': 0,
          '21-25': 0,
          '26-30': 0,
          '31-35': 0,
          '36-40': 0,
          '41-45': 0,
          '46-50': 0,
          '51+': 15
        }
      }
    ],
    gender: {
      male: 65,
      female: 33,
      other: 2,
      yearlyData: {
        male: {
          '2023': 65,
          '2022': 63,
          '2021': 64,
          '2020': 62
        },
        female: {
          '2023': 33,
          '2022': 35,
          '2021': 34,
          '2020': 36
        },
        other: {
          '2023': 2,
          '2022': 2,
          '2021': 2,
          '2020': 2
        }
      }
    },
    topMarkets: [
      {
        name: 'Ireland',
        yearlyData: {
          '2023': 35,
          '2022': 34,
          '2021': 33,
          '2020': 32
        }
      },
      { name: 'United Kingdom', yearlyData: { '2023': 20, '2022': 22, '2021': 21, '2020': 23 } },
      { name: 'United States', yearlyData: { '2023': 25, '2022': 27, '2021': 26, '2020': 28 } },
      { name: 'Nigeria', yearlyData: { '2023': 10, '2022': 12, '2021': 11, '2020': 13 } },
      { name: 'Cameroon', yearlyData: { '2023': 5, '2022': 7, '2021': 6, '2020': 8 } }
    ],
    intersection: {
      total: 15,
      breakdown: {
        casual: 8,
        regular: 5,
        professional: 2
      }
    }
  };

  const handleStatClick = (statType, data, title) => {
    setSelectedStat({
      type: statType,
      data: data,
      title: title
    });
  };

  return (
    <div className="App villa-theme">
      <div className="floating-bubbles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bubble" style={{
            '--delay': `${Math.random() * 5}s`,
            '--position': `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      <header className="App-header villa-header">
        {/* <img src={guinessLogo} alt="Guinness Logo" className="guinness-logo animate-fade-in" /> */}
        <h1 className="main-title">Guinness Drinkers Demographics</h1>
        <a href="/horse-riders" className="nav-link">View Horse Riders Demographics</a>
      </header>

      <div className="facts-ticker">
        <BeerFact fact={beerFacts[currentFactIndex]} />
      </div>

      <main className="demographics-container">
        <section className="demographic-section">
          <h2>Age Distribution</h2>
          <div className="age-groups">
            {demographicData.ageGroups.map(group => (
              <div 
                key={group.range} 
                className="stat-box clickable"
                onClick={() => handleStatClick('age', group.ageBreakdown, `Age Group ${group.range} Breakdown`)}
              >
                <h3>{group.range}</h3>
                <p>{group.percentage}%</p>
              </div>
            ))}
          </div>
        </section>

        <section className="demographic-section">
          <h2>Gender Distribution</h2>
          <div className="gender-stats">
            {Object.entries(demographicData.gender)
              .filter(([key]) => key !== 'yearlyData')
              .map(([gender, percentage]) => (
                <div 
                  key={gender} 
                  className="stat-box clickable"
                  onClick={() => handleStatClick(
                    'gender', 
                    demographicData.gender.yearlyData[gender],
                    `${gender.charAt(0).toUpperCase() + gender.slice(1)} Distribution`
                  )}
                >
                  <h3>{gender.charAt(0).toUpperCase() + gender.slice(1)}</h3>
                  <p>{percentage}%</p>
                </div>
            ))}
          </div>
        </section>

        <section className="demographic-section">
          <h2>Top Markets</h2>
          <ul className="markets-list">
            {demographicData.topMarkets.map(market => (
              <li 
                key={market.name} 
                className="clickable"
                onClick={() => handleStatClick('market', market.yearlyData, `Market: ${market.name}`)}
              >
                {market.name}
              </li>
            ))}
          </ul>
        </section>

        <section className="demographic-section">
          <h2>Guinness Drinkers Who Ride Horses</h2>
          <div 
            className="stat-box clickable"
            onClick={() => handleStatClick(
              'intersection',
              demographicData.intersection.breakdown,
              'Horse Riding Guinness Drinkers Breakdown'
            )}
          >
            <h3>Total Overlap</h3>
            <p>{demographicData.intersection.total}%</p>
            <small>Click for detailed breakdown</small>
          </div>
        </section>
      </main>

      <footer className="guinness-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>The Perfect Pour</h3>
            <div className="pour-steps">
              <div className="step">
                <span className="step-number">1</span>
                <p>Use a clean, dry glass</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <p>Hold at 45° angle</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <p>Pull tap fully forward</p>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <p>Let settle for 119.5s</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {selectedStat && (
        <Modal
          data={selectedStat.data}
          title={selectedStat.title}
          onClose={() => setSelectedStat(null)}
        />
      )}
    </div>
  );
}

export default App;
