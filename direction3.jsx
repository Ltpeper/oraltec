// Direction 3: Operationeel — planning & onderhoud-first
// Kalender centraal, bestellingen als side-action, voor praktijken met meerdere units

const { useState: useState3 } = React;

function Dir3PodRow({ active }) {
  return (
    <div style={{
      width: 22, height: 30, borderRadius: 8,
      background: 'linear-gradient(165deg, var(--ot-surface-2), var(--ot-surface-3))',
      border: '1px solid var(--ot-border)', position: 'relative', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', left: '25%', right: '25%', top: '22%', height: 2,
        borderRadius: 1, background: active ? 'var(--ot-accent)' : 'var(--ot-border-strong)',
        boxShadow: active ? '0 0 6px var(--ot-accent)' : 'none',
      }} />
    </div>
  );
}

function Dir3Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: 200, flexShrink: 0, background: 'var(--ot-surface-1)',
      borderRight: '1px solid var(--ot-border)',
      display: 'flex', flexDirection: 'column', padding: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, padding: '4px 6px' }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--ot-accent)',
          display: 'grid', placeItems: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>O</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)' }}>Oraltec</div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--ot-fg-muted)', letterSpacing: 0.5, textTransform: 'uppercase',
        padding: '0 8px 6px', fontWeight: 500 }}>Werkdag</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 18 }}>
        {[
          { key: 'schedule', label: 'Planning' },
          { key: 'orders',   label: 'Bestellingen' },
          { key: 'messages', label: 'Berichten',   badge: 2 },
        ].map(item => (
          <button key={item.key} onClick={() => setActive(item.key)}
            style={{
              all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px', borderRadius: 5, fontSize: 12.5,
              color: active === item.key ? 'var(--ot-fg)' : 'var(--ot-fg-muted)',
              background: active === item.key ? 'var(--ot-surface-2)' : 'transparent',
              fontWeight: active === item.key ? 500 : 400,
            }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%',
              background: active === item.key ? 'var(--ot-accent)' : 'var(--ot-fg-muted)' }} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && <span style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 999,
              background: 'var(--ot-accent)', color: '#fff',
            }}>{item.badge}</span>}
          </button>
        ))}
      </nav>

      <div style={{ fontSize: 10, color: 'var(--ot-fg-muted)', letterSpacing: 0.5, textTransform: 'uppercase',
        padding: '0 8px 6px', fontWeight: 500 }}>Beheer</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {[
          { key: 'team',     label: 'Team' },
          { key: 'docs',     label: 'Documenten' },
          { key: 'settings', label: 'Instellingen' },
        ].map(item => (
          <button key={item.key} onClick={() => setActive(item.key)}
            style={{
              all: 'unset', cursor: 'pointer', padding: '7px 16px', borderRadius: 5,
              fontSize: 12.5, color: 'var(--ot-fg-muted)',
            }}>{item.label}</button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: 12, borderRadius: 8,
        background: 'var(--ot-surface-0)', border: '1px solid var(--ot-border-soft)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ot-accent)' }} />
          <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)', letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Voorraad
          </div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ot-fg)', fontVariantNumeric: 'tabular-nums' }}>
          18<span style={{ fontSize: 11, color: 'var(--ot-fg-muted)', fontWeight: 400 }}> / 24 pods</span>
        </div>
        <button style={{ all: 'unset', cursor: 'pointer', marginTop: 8, fontSize: 11,
          color: 'var(--ot-accent-strong)', fontWeight: 500 }}>Nu bijbestellen →</button>
      </div>
    </aside>
  );
}

function Dir3WeekCalendar() {
  const days = ['Ma 20', 'Di 21', 'Wo 22', 'Do 23', 'Vr 24', 'Za 25', 'Zo 26'];
  const events = [
    { day: 2, start: 1, span: 2, type: 'delivery',    title: 'OT-2948 levering',  sub: '24× Pod S2' },
    { day: 0, start: 3, span: 1, type: 'maintenance', title: 'Lamp vervangen',    sub: 'Unit 3' },
    { day: 3, start: 2, span: 3, type: 'reorder',     title: 'Auto-herbestelling', sub: 'Pod Pro · 12x' },
    { day: 4, start: 4, span: 1, type: 'maintenance', title: 'Kwartaalcheck',     sub: 'Alle units' },
  ];
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  const typeStyle = {
    delivery:    { bg: 'var(--ot-accent-soft)', fg: 'var(--ot-accent-strong)', bar: 'var(--ot-accent)' },
    maintenance: { bg: 'var(--ot-surface-2)',   fg: 'var(--ot-fg)',            bar: 'var(--ot-fg-soft)' },
    reorder:     { bg: 'var(--ot-ok-soft)',     fg: 'var(--ot-ok-strong)',     bar: 'var(--ot-ok)' },
  };

  return (
    <div style={{
      background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)',
      borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--ot-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)' }}>Week 17 · Apr 2026</div>
          <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', marginTop: 2 }}>Bestellingen, onderhoud & levering</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={{ all: 'unset', cursor: 'pointer', padding: '5px 10px', fontSize: 11.5,
            border: '1px solid var(--ot-border)', borderRadius: 5, color: 'var(--ot-fg-muted)' }}>‹</button>
          <button style={{ all: 'unset', cursor: 'pointer', padding: '5px 12px', fontSize: 11.5,
            border: '1px solid var(--ot-border)', borderRadius: 5, color: 'var(--ot-fg)' }}>Vandaag</button>
          <button style={{ all: 'unset', cursor: 'pointer', padding: '5px 10px', fontSize: 11.5,
            border: '1px solid var(--ot-border)', borderRadius: 5, color: 'var(--ot-fg-muted)' }}>›</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(7, 1fr)',
        borderBottom: '1px solid var(--ot-border)' }}>
        <div />
        {days.map((d, i) => (
          <div key={d} style={{
            padding: '10px 12px', fontSize: 11, color: i === 2 ? 'var(--ot-accent-strong)' : 'var(--ot-fg-muted)',
            fontWeight: i === 2 ? 600 : 400, borderLeft: '1px solid var(--ot-border-soft)',
            letterSpacing: 0.3, textTransform: 'uppercase',
          }}>{d}</div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '56px repeat(7, 1fr)',
        gridTemplateRows: `repeat(${hours.length}, 1fr)`, position: 'relative' }}>
        {hours.map((h, hi) => (
          <React.Fragment key={h}>
            <div style={{
              gridColumn: 1, gridRow: hi + 1,
              fontSize: 10, color: 'var(--ot-fg-muted)',
              padding: '6px 8px 0 10px', fontFamily: 'IBM Plex Mono, monospace',
              borderTop: '1px solid var(--ot-border-soft)',
            }}>{h}</div>
            {[0,1,2,3,4,5,6].map(di => (
              <div key={di} style={{
                gridColumn: di + 2, gridRow: hi + 1,
                borderLeft: '1px solid var(--ot-border-soft)',
                borderTop: '1px solid var(--ot-border-soft)',
                background: di === 2 ? 'var(--ot-accent-soft)' : 'transparent', opacity: di === 2 ? 0.15 : 1,
              }} />
            ))}
          </React.Fragment>
        ))}
        {events.map((e, i) => {
          const s = typeStyle[e.type];
          return (
            <div key={i} style={{
              gridColumn: e.day + 2, gridRow: `${e.start + 1} / span ${e.span}`,
              margin: 4, padding: '7px 9px', borderRadius: 6,
              background: s.bg, borderLeft: `2px solid ${s.bar}`,
              fontSize: 11, color: s.fg, lineHeight: 1.35,
              display: 'flex', flexDirection: 'column', gap: 2, cursor: 'pointer',
            }}>
              <div style={{ fontWeight: 500 }}>{e.title}</div>
              <div style={{ fontSize: 10, opacity: 0.8 }}>{e.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Dir3RightPanel({ onOpen }) {
  return (
    <aside style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)',
        borderRadius: 12, padding: 18,
      }}>
        <div style={{ fontSize: 11, color: 'var(--ot-accent-strong)', letterSpacing: 0.4,
          textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>Vandaag</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ot-fg)', lineHeight: 1.4, marginBottom: 14 }}>
          Levering OT-2948 aankomend, 14:00–16:00
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onOpen(ORALTEC_ORDERS[0])} style={{
            all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center',
            padding: '8px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
            background: 'var(--ot-accent)', color: '#fff',
          }}>Track</button>
          <button style={{
            all: 'unset', cursor: 'pointer', padding: '8px 12px', borderRadius: 6, fontSize: 12,
            border: '1px solid var(--ot-border)', color: 'var(--ot-fg)',
          }}>Plan</button>
        </div>
      </div>

      <div style={{
        background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)',
        borderRadius: 12, padding: 18,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)' }}>Nabestellen</div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: 10, borderRadius: 7, border: '1px solid var(--ot-border-soft)',
          background: 'var(--ot-surface-0)', marginBottom: 10,
        }}>
          <Dir3PodRow active />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--ot-fg)', fontWeight: 500 }}>{ORALTEC_PRODUCT.name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)', fontVariantNumeric: 'tabular-nums' }}>{ORALTEC_PRODUCT.price} {ORALTEC_PRODUCT.unit}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--ot-border)', borderRadius: 5 }}>
            <button style={{ all: 'unset', cursor: 'pointer', padding: '3px 8px', color: 'var(--ot-fg-muted)', fontSize: 12 }}>−</button>
            <div style={{ padding: '3px 6px', fontSize: 11.5, color: 'var(--ot-fg)', borderLeft: '1px solid var(--ot-border)', borderRight: '1px solid var(--ot-border)', fontVariantNumeric: 'tabular-nums' }}>24</div>
            <button style={{ all: 'unset', cursor: 'pointer', padding: '3px 8px', color: 'var(--ot-fg-muted)', fontSize: 12 }}>+</button>
          </div>
        </div>
        <button style={{
          all: 'unset', cursor: 'pointer', padding: '7px 12px', borderRadius: 6,
          fontSize: 11.5, fontWeight: 500, textAlign: 'center', display: 'block', width: 'calc(100% - 24px)',
          background: 'var(--ot-accent)', color: '#fff',
        }}>Plaats bestelling</button>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--ot-border-soft)' }}>
          <div style={{ fontSize: 11, color: 'var(--ot-accent-strong)', fontWeight: 500, marginBottom: 3 }}>
            Of: eigen branding
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)', lineHeight: 1.5, marginBottom: 8 }}>
            Oraltec One met jouw praktijklogo. Min. 25 stuks.
          </div>
          <button style={{ all: 'unset', cursor: 'pointer', fontSize: 11, color: 'var(--ot-accent-strong)', fontWeight: 500 }}>
            Verzoek plaatsen →
          </button>
        </div>
      </div>

      <div style={{
        background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)',
        borderRadius: 12, padding: 18, flex: 1,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)', marginBottom: 12 }}>
          Unit-status
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { name: 'Unit 1 · Kamer A', hrs: 6420, max: 8000 },
            { name: 'Unit 2 · Kamer B', hrs: 2110, max: 8000 },
            { name: 'Unit 3 · Kamer C', hrs: 7830, max: 8000 },
          ].map(u => {
            const pct = (u.hrs / u.max) * 100;
            const warn = pct > 90;
            return (
              <div key={u.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}>
                  <span style={{ color: 'var(--ot-fg)' }}>{u.name}</span>
                  <span style={{ color: warn ? 'var(--ot-accent-strong)' : 'var(--ot-fg-muted)',
                    fontFamily: 'IBM Plex Mono, monospace' }}>{u.hrs}h</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'var(--ot-surface-2)', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%',
                    background: warn ? 'var(--ot-accent)' : 'var(--ot-fg-soft)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function Direction3() {
  const [active, setActive] = useState3('schedule');
  const [openOrder, setOpenOrder] = useState3(null);

  return (
    <div className="ot-root" style={{
      width: 1280, height: 820, display: 'flex', overflow: 'hidden', position: 'relative',
      background: 'var(--ot-surface-0)', color: 'var(--ot-fg)',
      fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13,
    }}>
      <Dir3Sidebar active={active} setActive={setActive} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', borderBottom: '1px solid var(--ot-border)',
        }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Planning
            </div>
            <h1 style={{ margin: '2px 0 0', fontSize: 18, fontWeight: 600, color: 'var(--ot-fg)' }}>
              Deze week
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              all: 'unset', cursor: 'pointer', padding: '7px 14px', borderRadius: 6,
              fontSize: 12, border: '1px solid var(--ot-border)', color: 'var(--ot-fg)',
            }}>Filter</button>
            <button style={{
              all: 'unset', cursor: 'pointer', padding: '7px 14px', borderRadius: 6,
              fontSize: 12, fontWeight: 500, background: 'var(--ot-accent)', color: '#fff',
            }}>+ Plan onderhoud</button>
          </div>
        </header>

        <div style={{ flex: 1, padding: 20, display: 'flex', gap: 16, minHeight: 0 }}>
          <Dir3WeekCalendar />
          <Dir3RightPanel onOpen={setOpenOrder} />
        </div>
      </main>

      <Dir1OrderDrawer order={openOrder} onClose={() => setOpenOrder(null)} />
    </div>
  );
}

window.Direction3 = Direction3;
