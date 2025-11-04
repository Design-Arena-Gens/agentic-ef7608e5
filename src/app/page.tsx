'use client';

import { useMemo, useState } from 'react';
import { players } from '@/data/players';
import { PlayerCard } from '@/components/player-card';

type RegionFilter = 'All regions' | 'North America' | 'EMEA';

type RoleFilter = 'All roles' | string;

const regionOptions: RegionFilter[] = ['All regions', 'North America', 'EMEA'];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('All regions');
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('All roles');

  const roleOptions = useMemo(() => {
    const set = new Set<string>();
    players.forEach((player) => {
      player.valorantRole
        .split('/')
        .map((role) => role.trim())
        .filter(Boolean)
        .forEach((role) => set.add(role));
    });
    return ['All roles', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const tagOptions = useMemo(() => {
    const set = new Set<string>();
    players.forEach((player) => {
      player.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPlayers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return players.filter((player) => {
      const matchesSearch =
        query.length === 0 ||
        [
          player.alias,
          player.name,
          player.country,
          player.currentTeam,
          player.valorantRole,
          ...player.valorantHighlights,
          ...player.csHighlights,
          ...player.tags,
        ]
          .join(' ')
          .toLowerCase()
          .includes(query);

      const matchesRegion =
        selectedRegion === 'All regions' || player.region === selectedRegion;

      const matchesRole =
        selectedRole === 'All roles' || player.valorantRole.includes(selectedRole);

      const matchesTag =
        !selectedTag || player.tags.some((tag) => tag === selectedTag);

      return matchesSearch && matchesRegion && matchesRole && matchesTag;
    });
  }, [searchTerm, selectedRegion, selectedRole, selectedTag]);

  const aggregates = useMemo(() => {
    return players.reduce(
      (acc, player) => {
        player.timeline.forEach((entry) => {
          if (entry.game === 'CS:GO' && entry.tier === 'Major') {
            acc.csMajorAppearances += 1;
          }
          if (entry.game === 'Valorant' && (entry.tier === 'International' || entry.tier === 'Champions')) {
            acc.valorantInternationalPlacements += 1;
          }
          if (/won/i.test(entry.achievement)) {
            acc.trophiesClaimed += 1;
          }
        });
        return acc;
      },
      {
        csMajorAppearances: 0,
        valorantInternationalPlacements: 0,
        trophiesClaimed: 0,
      }
    );
  }, []);

  return (
    <main className="page-stack" style={{ paddingTop: 'clamp(2.5rem, 4vw, 5rem)', paddingBottom: 'clamp(3rem, 4vw, 5.5rem)' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <p className="badge badge-primary">Valorant • Counter-Strike</p>
        <h1 className="hero-title">
          Valorant pros with <span className="hero-highlight">tier-one Counter-Strike DNA</span>
        </h1>
        <p className="hero-subheading">
          A curated dossier of Valorant competitors who previously thrived at the highest level of Counter-Strike.
          Explore their accolades, cross-game timelines, and the leadership traits they brought into Riot&apos;s tactical FPS.
        </p>
        <section className="card-surface card-block">
          <div className="metric-grid">
            <InsightMetric
              label="Combined CS:GO Major appearances"
              value={aggregates.csMajorAppearances.toString()}
              caption="Every player on this list has stepped onto a Major stage."
            />
          <InsightMetric
            label="International Valorant placements"
            value={aggregates.valorantInternationalPlacements.toString()}
            caption="Masters & Champions playoff runs powered by CS veterans."
          />
            <InsightMetric
              label="Recorded tier-one trophies"
              value={aggregates.trophiesClaimed.toString()}
              caption="Across Riot & Valve circuits with these core rosters."
            />
          </div>
        </section>
      </section>

      <section className="card-surface card-block">
        <h2 className="section-heading">Filter the roster</h2>
        <div className="controls">
          <input
            className="control-input control-input-fluid"
            placeholder="Search by player, team, accolade, or keyword"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select
            className="control-input"
            value={selectedRegion}
            onChange={(event) => setSelectedRegion(event.target.value as RegionFilter)}
          >
            {regionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="control-input"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as RoleFilter)}
          >
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-buttons">
          <button
            type="button"
            className={`control-input ${selectedTag === null ? 'filter-button-neutral' : ''}`}
            onClick={() => setSelectedTag(null)}
            style={{ paddingInline: '0.9rem', paddingBlock: '0.45rem', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
            data-active={selectedTag === null}
          >
            All tags
          </button>
          {tagOptions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`control-input ${selectedTag === tag ? 'filter-button-active' : ''}`}
              style={{ paddingInline: '0.9rem', paddingBlock: '0.45rem', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-400">
          Showing <strong>{filteredPlayers.length}</strong> of {players.length} crossover pros.
        </p>
      </section>

      <section className="player-grid">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </section>
    </main>
  );
}

type InsightMetricProps = {
  label: string;
  value: string;
  caption: string;
};

function InsightMetric({ label, value, caption }: InsightMetricProps) {
  return (
    <div className="metric-card">
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      <p className="metric-caption">{caption}</p>
    </div>
  );
}
