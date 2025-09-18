import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

interface DailyMetric {
  id: string;
  created_at: string;
  metric_date: string;
  website_visits: number;
  app_downloads: number;
  finished_operations: number;
  liquidity: number;
}

function App() {
  const [metricDate, setMetricDate] = useState<string>('');
  const [websiteVisits, setWebsiteVisits] = useState<number>(0);
  const [appDownloads, setAppDownloads] = useState<number>(0);
  const [finishedOperations, setFinishedOperations] = useState<number>(0);
  const [liquidity, setLiquidity] = useState<number>(0);
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchDailyMetrics(currentDate);
  }, [currentDate]);

  const fetchDailyMetrics = async (date: string) => {
    const { data, error } = await supabase
      .from('daily_metrics')
      .select('*')
      .eq('metric_date', date)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching daily metrics:', error);
    } else {
      setDailyMetrics(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('daily_metrics')
      .insert([
        {
          metric_date: metricDate,
          website_visits: websiteVisits,
          app_downloads: appDownloads,
          finished_operations: finishedOperations,
          liquidity: liquidity,
        },
      ]);

    if (error) {
      console.error('Error inserting daily metric:', error);
    } else {
      console.log('Daily metric inserted:', data);
      setMetricDate('');
      setWebsiteVisits(0);
      setAppDownloads(0);
      setFinishedOperations(0);
      setLiquidity(0);
      fetchDailyMetrics(currentDate); // Refresh data for current date
    }
  };

  const handleDateChange = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Abwaab Dashboard</h1>
      </header>
      <main>
        <section className="date-navigation">
          <button onClick={() => handleDateChange(-1)}>Previous Day</button>
          <h2>Date: {currentDate}</h2>
          <button onClick={() => handleDateChange(1)}>Next Day</button>
        </section>

        <section className="data-entry">
          <h3>Enter Daily Metrics</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Date:
              <input
                type="date"
                value={metricDate}
                onChange={(e) => setMetricDate(e.target.value)}
                required
              />
            </label>
            <label>
              Website Visits:
              <input
                type="number"
                value={websiteVisits}
                onChange={(e) => setWebsiteVisits(parseInt(e.target.value))}
                required
              />
            </label>
            <label>
              App Downloads:
              <input
                type="number"
                value={appDownloads}
                onChange={(e) => setAppDownloads(parseInt(e.target.value))}
                required
              />
            </label>
            <label>
              Finished Operations:
              <input
                type="number"
                value={finishedOperations}
                onChange={(e) => setFinishedOperations(parseInt(e.target.value))}
                required
              />
            </label>
            <label>
              Liquidity:
              <input
                type="number"
                step="0.01"
                value={liquidity}
                onChange={(e) => setLiquidity(parseFloat(e.target.value))}
                required
              />
            </label>
            <button type="submit">Add Metric</button>
          </form>
        </section>

        <section className="data-view">
          <h3>Metrics for {currentDate}</h3>
          {dailyMetrics.length === 0 ? (
            <p>No data for this date.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Created At</th>
                  <th>Website Visits</th>
                  <th>App Downloads</th>
                  <th>Finished Operations</th>
                  <th>Liquidity</th>
                </tr>
              </thead>
              <tbody>
                {dailyMetrics.map((metric) => (
                  <tr key={metric.id}>
                    <td>{new Date(metric.created_at).toLocaleString()}</td>
                    <td>{metric.website_visits}</td>
                    <td>{metric.app_downloads}</td>
                    <td>{metric.finished_operations}</td>
                    <td>{metric.liquidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
