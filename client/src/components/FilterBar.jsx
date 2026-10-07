import React from 'react';
import {
  Search,
  LayoutGrid,
  List,
  BarChart3,
  SlidersHorizontal
} from 'lucide-react';

const STAGES = [
  { id: 'all', label: 'All Applications' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'applied', label: 'Applied' },
  { id: 'interviewing', label: 'Interviewing' },
  { id: 'offer', label: 'Offers' },
  { id: 'rejected', label: 'Archived' }
];

export default function FilterBar({
  search,
  setSearch,
  selectedStage,
  setSelectedStage,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  counts
}) {
  return (
    <div>
      {/* Search and control bar */}
      <div className="toolbar-container">
        {/* Search */}
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            id="input-search-applications"
            type="text"
            className="search-input"
            placeholder="Search by company, title, location, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Right Controls */}
        <div className="filter-group">
          {/* Sort By */}
          <select
            id="select-sort-by"
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="updatedAt_desc">Recently Updated</option>
            <option value="createdAt_desc">Date Added (Newest)</option>
            <option value="company_asc">Company (A-Z)</option>
            <option value="deadline_asc">Upcoming Deadline</option>
            <option value="stipend_desc">Highest Stipend</option>
          </select>

          {/* View mode tabs */}
          <div className="view-tabs">
            <button
              id="view-tab-kanban"
              className={`view-tab-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
              title="Kanban Board View"
            >
              <LayoutGrid size={15} />
              <span>Kanban</span>
            </button>

            <button
              id="view-tab-table"
              className={`view-tab-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table List View"
            >
              <List size={15} />
              <span>List</span>
            </button>

            <button
              id="view-tab-analytics"
              className={`view-tab-btn ${viewMode === 'analytics' ? 'active' : ''}`}
              onClick={() => setViewMode('analytics')}
              title="Analytics Insights View"
            >
              <BarChart3 size={15} />
              <span>Insights</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage filter pills row (only on kanban / table view) */}
      {viewMode !== 'analytics' && (
        <div className="stage-pills-row">
          {STAGES.map((s) => {
            const count = s.id === 'all'
              ? (counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0)
              : (counts ? counts[s.id] || 0 : 0);

            return (
              <button
                key={s.id}
                id={`filter-pill-${s.id}`}
                className={`stage-pill-btn ${selectedStage === s.id ? 'active' : ''}`}
                onClick={() => setSelectedStage(s.id)}
              >
                <span>{s.label}</span>
                <span className="stage-pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
