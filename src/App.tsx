
import { useState } from "react";
import { records, surveys } from "./data";
import type { ContactChannel, RecordType } from "./data";
import "./App.css";


const months = [
  { value: "all", label: "All months" },
  { value: "2026-06", label: "June 2026" },
  { value: "2026-07", label: "July 2026" },
  { value: "2026-08", label: "August 2026" },
];


const recordTypes: RecordType[] = [
  "Escalation",
  "Cancellation",
  "Pause",
  "Support Request",
  "Billing Request",
];

const channels: ContactChannel[] = [
  "Call",
  "Email",
  "Chat",
  "Meeting",
];

const categories = Array.from(
  new Set(records.map((record) => record.category))
).sort();

function calculateNps(scores: number[]) {
  if (scores.length === 0) {
    return null;
  }

  const promoters = scores.filter((score) => score >= 9).length;
  const detractors = scores.filter((score) => score <= 6).length;

  return Math.round(
    ((promoters - detractors) / scores.length) * 100
  );
}

function App() {
  const [month, setMonth] = useState("all");
  const [recordType, setRecordType] = useState("all");
  const [channel, setChannel] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredRecords = records.filter((record) => {
    if (month !== "all" && !record.date.startsWith(month)) {
      return false;
    }

    if (recordType !== "all" && record.type !== recordType) {
      return false;
    }

    if (channel !== "all" && record.channel !== channel) {
      return false;
    }

    if (category !== "all" && record.category !== category) {
      return false;
    }

    if (status !== "all" && record.status !== status) {
      return false;
    }

    const searchText = `
      ${record.id} ${record.client} ${record.type}
      ${record.category} ${record.channel} ${record.status}
    `.toLowerCase();

    return searchText.includes(search.trim().toLowerCase());
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortOrder === "oldest") {
      return a.date.localeCompare(b.date);
    }

    return b.date.localeCompare(a.date);
  });

  const escalationCount = filteredRecords.filter(
    (record) => record.type === "Escalation"
  ).length;

  const cancellationCount = filteredRecords.filter(
    (record) => record.type === "Cancellation"
  ).length;

  const pauseCount = filteredRecords.filter(
    (record) => record.type === "Pause"
  ).length;

  const followUpCount = filteredRecords.filter(
    (record) => record.status !== "Resolved"
  ).length;

  const selectedSurveys = surveys.filter(
    (survey) => month === "all" || survey.date.startsWith(month)
  );

  const nps = calculateNps(
    selectedSurveys.map((survey) => survey.score)
  );

  const typeCounts = recordTypes.map((type) => ({
    name: type,
    count: filteredRecords.filter(
      (record) => record.type === type
    ).length,
  }));

  const largestCount = Math.max(
    1,
    ...typeCounts.map((item) => item.count)
  );

  const channelCounts = channels.map((item) => ({
    name: item,
    count: filteredRecords.filter(
      (record) => record.channel === item
    ).length,
  }));

  channelCounts.sort((a, b) => b.count - a.count);

  function clearFilters() {
    setMonth("all");
    setRecordType("all");
    setChannel("all");
    setCategory("all");
    setStatus("all");
    setSearch("");
    setSortOrder("newest");
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div>
            <p className="eyebrow">FRONTEND PORTFOLIO PROJECT</p>
            <h1>Service Operations Dashboard</h1>
            <p className="header-description">
              Client operations, reporting, and service insights.
            </p>
          </div>

          <span className="demo-label">Sample data</span>
        </div>
      </header>

      <main className="container main-content">
        <section className="panel" aria-labelledby="filters-title">
          <div className="section-heading">
            <div>
              <h2 id="filters-title">Filters</h2>
              <p className="muted">
                Explore service records by month, type, and status.
              </p>
            </div>

            <button
              type="button"
              className="clear-button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>

          <div className="filters">
            <div className="field">
              <label htmlFor="month">Month</label>
              <select
                id="month"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              >
                {months.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="recordType">Record type</label>
              <select
                id="recordType"
                value={recordType}
                onChange={(event) => setRecordType(event.target.value)}
              >
                <option value="all">All types</option>
                {recordTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="channel">Contact channel</label>
              <select
                id="channel"
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
              >
                <option value="all">All channels</option>
                {channels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="category">Concern / reason</label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="search">Search records</label>
              <input
                id="search"
                type="search"
                placeholder="Client, ID, or category"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="overview-title">
          <h2 className="section-title" id="overview-title">
            Overview
          </h2>

          <div className="stats">
            <div className="stat">
              <p>Matching records</p>
              <strong>{filteredRecords.length}</strong>
            </div>

            <div className="stat">
              <p>Escalations</p>
              <strong>{escalationCount}</strong>
            </div>

            <div className="stat">
              <p>Cancellations</p>
              <strong>{cancellationCount}</strong>
            </div>

            <div className="stat">
              <p>Pauses</p>
              <strong>{pauseCount}</strong>
            </div>

            <div className="stat">
              <p>Need follow-up</p>
              <strong>{followUpCount}</strong>
            </div>

            <div className="stat">
              <p>NPS</p>
              <strong>{nps === null ? "N/A" : nps}</strong>
            </div>
          </div>

          <p className="note">
            NPS uses separate sample surveys and follows the
            month filter only.
          </p>
        </section>

        <div className="charts">
          <section className="panel" aria-labelledby="types-title">
            <h2 id="types-title">Records by Type</h2>
            <p className="muted">
              Record counts update with your filters.
            </p>

            <ul className="bar-list">
              {typeCounts.map((item) => (
                <li key={item.name}>
                  <div className="bar-label">
                    <span>{item.name}</span>
                    <strong>{item.count}</strong>
                  </div>

                  <div className="bar-track" aria-hidden="true">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(item.count / largestCount) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel" aria-labelledby="channels-title">
            <h2 id="channels-title">Records by Channel</h2>
            <p className="muted">
              How service requests were received.
            </p>

            <ul className="channel-list">
              {channelCounts.map((item) => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <strong>{item.count}</strong>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="panel" aria-labelledby="records-title">
          <div className="section-heading">
            <div>
              <h2 id="records-title">Service Records</h2>
              <p className="muted" role="status">
                Showing {sortedRecords.length} of {records.length} records.
              </p>
            </div>

            <div className="field sort-field">
              <label htmlFor="sortOrder">Sort by date</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table>
              <caption className="visually-hidden">
                Fictional client service records
              </caption>

              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Client</th>
                  <th scope="col">Type</th>
                  <th scope="col">Concern / Reason</th>
                  <th scope="col">Channel</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>

              <tbody>
                {sortedRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      No matching records. Try clearing a filter.
                    </td>
                  </tr>
                ) : (
                  sortedRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td>{record.client}</td>
                      <td>{record.type}</td>
                      <td>{record.category}</td>
                      <td>{record.channel}</td>
                      <td>
                        <span className="status-label">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="footer">
        Independent portfolio project using fictional data.
      </footer>
    </div>
  );
}

export default App;
