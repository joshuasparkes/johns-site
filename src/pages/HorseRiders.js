import { useState } from 'react';
import '../App.css';

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

function HorseRiders() {
  const [selectedStat, setSelectedStat] = useState(null);

  const demographicData = {
    ageGroups: [
      { 
        range: '21-30', 
        percentage: 30,
        ageBreakdown: {
          '18-20': 8,
          '21-25': 12,
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
        percentage: 40,
        ageBreakdown: {
          '18-20': 0,
          '21-25': 0,
          '26-30': 0,
          '31-35': 25,
          '36-40': 15,
          '41-45': 0,
          '46-50': 0,
          '51+': 0
        }
      },
      { 
        range: '41-50', 
        percentage: 20,
        ageBreakdown: {
          '18-20': 0,
          '21-25': 0,
          '26-30': 0,
          '31-35': 0,
          '36-40': 0,
          '41-45': 12,
          '46-50': 8,
          '51+': 0
        }
      },
      { 
        range: '51+', 
        percentage: 10,
        ageBreakdown: {
          '18-20': 0,
          '21-25': 0,
          '26-30': 0,
          '31-35': 0,
          '36-40': 0,
          '41-45': 0,
          '46-50': 0,
          '51+': 10
        }
      }
    ],
    gender: {
      male: 45,
      female: 53,
      other: 2
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
      <header className="App-header villa-header">
        <h1>Horse Riders Demographics</h1>
        <a href="/" className="nav-link">Back to Guinness Demographics</a>
      </header>
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
            {Object.entries(demographicData.gender).map(([gender, percentage]) => (
              <div 
                key={gender} 
                className="stat-box"
              >
                <h3>{gender.charAt(0).toUpperCase() + gender.slice(1)}</h3>
                <p>{percentage}%</p>
              </div>
            ))}
          </div>
        </section>
      </main>

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

export default HorseRiders; 