'use client';

import type { Player } from '@/data/players';

const badgePalette: Record<Player['region'], string> = {
  'North America': 'badge badge-primary',
  EMEA: 'badge badge-contrast',
};

export function PlayerCard({ player }: { player: Player }) {
  return (
    <article className="card-surface gradient-border player-card">
      <header className="card-header">
        <div className="pill-row">
          <span className="badge badge-primary">{player.valorantRole}</span>
          <span className={badgePalette[player.region]}>{player.region}</span>
          <span className="badge" style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(125,211,252,0.4)', color: '#bae6fd' }}>
            {player.currentTeam}
          </span>
        </div>
        <h3 className="player-title">
          {player.alias}
          <span>{player.name}</span>
        </h3>
        <p className="text-soft" style={{ lineHeight: 1.6 }}>
          {player.headline}
        </p>
      </header>

      <section className="section-columns">
        <div>
          <h4 className="section-heading">Valorant Impact</h4>
          <ul className="list-reset" style={{ display: 'grid', gap: '0.5rem', color: 'rgba(226,232,240,0.82)', fontSize: '0.92rem' }}>
            {player.valorantHighlights.map((item) => (
              <li key={item} style={{ lineHeight: 1.5 }}>
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="section-heading">Counter-Strike Pedigree</h4>
          <ul className="list-reset" style={{ display: 'grid', gap: '0.5rem', color: 'rgba(226,232,240,0.82)', fontSize: '0.92rem' }}>
            {player.csHighlights.map((item) => (
              <li key={item} style={{ lineHeight: 1.5 }}>
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h4 className="section-heading">Career Timeline</h4>
        <div className="timeline scrollbar-thin">
          {player.timeline.map((entry) => (
            <div key={`${entry.year}-${entry.team}-${entry.game}`} className="timeline-card">
              <strong>{entry.year}</strong>
              <span style={{ color: entry.game === 'CS:GO' ? '#facc15' : '#a855f7', fontWeight: 600 }}>
                {entry.game}
              </span>
              <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{entry.team}</span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(226,232,240,0.76)' }}>{entry.achievement}</span>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(100,116,139,0.8)' }}>
                {entry.tier}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="tag-cloud" style={{ flex: '1 1 auto' }}>
          {player.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(148,163,184,0.85)' }}>
          {player.socials.twitter ? (
            <a
              href={player.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.2s ease' }}
              className="hover-link"
            >
              Twitter
            </a>
          ) : null}
          {player.socials.twitch ? (
            <a
              href={player.socials.twitch}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'color 0.2s ease' }}
              className="hover-link"
            >
              Twitch
            </a>
          ) : null}
          <a
            href={player.socials.liquipedia}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transition: 'color 0.2s ease' }}
            className="hover-link"
          >
            Liquipedia
          </a>
        </div>
      </footer>
    </article>
  );
}
