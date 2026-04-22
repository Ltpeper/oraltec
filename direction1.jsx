// Direction 1: Klassiek enterprise
// Sidebar + prominent orders table. Vertrouwd voor B2B inkopers.

const { useState, useMemo } = React;

function StatusPill({ status }) {
  const map = {
    'Onderweg': { bg: 'var(--ot-accent-soft)', fg: 'var(--ot-accent-strong)', dot: 'var(--ot-accent)' },
    'Geleverd': { bg: 'var(--ot-ok-soft)',     fg: 'var(--ot-ok-strong)',     dot: 'var(--ot-ok)' },
  };
  const s = map[status] || map['Geleverd'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999, fontSize: 11.5, fontWeight: 500,
      background: s.bg, color: s.fg, letterSpacing: 0.1,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot }} />
      {status}
    </span>
  );
}

function PodGlyph({ size = 40, tone = 'accent' }) {
  // Capsule vorm — niet figuratief, gewoon een pod-silhouet
  const color = tone === 'accent' ? 'var(--ot-accent)' : 'var(--ot-fg-soft)';
  return (
    <div style={{
      width: size, height: size * 1.25, borderRadius: size * 0.4,
      background: `linear-gradient(180deg, var(--ot-surface-2), var(--ot-surface-3))`,
      border: '1px solid var(--ot-border)',
      position: 'relative', flexShrink: 0,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      <div style={{
        position: 'absolute', inset: '18% 28% auto 28%', height: '6%',
        borderRadius: 2, background: color, opacity: 0.85,
        boxShadow: `0 0 8px ${color}`,
      }} />
      <div style={{
        position: 'absolute', left: '50%', bottom: '12%', transform: 'translateX(-50%)',
        width: '30%', height: 3, borderRadius: 2, background: 'var(--ot-border-strong)',
      }} />
    </div>
  );
}

function Dir1Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: 220, flexShrink: 0, background: 'var(--ot-surface-1)',
      borderRight: '1px solid var(--ot-border)', display: 'flex', flexDirection: 'column',
      padding: '20px 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 20px' }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: 'var(--ot-accent)', display: 'grid', placeItems: 'center',
          color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
        }}>O</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)' }}>Oraltec</div>
          <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)', letterSpacing: 0.3 }}>KLANTPORTAAL</div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {ORALTEC_NAV.map(item => (
          <button key={item.key} onClick={() => setActive(item.key)}
            style={{
              all: 'unset', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 6,
              fontSize: 13, color: active === item.key ? 'var(--ot-fg)' : 'var(--ot-fg-muted)',
              background: active === item.key ? 'var(--ot-surface-2)' : 'transparent',
              fontWeight: active === item.key ? 500 : 400,
            }}>
            <span style={{
              width: 14, height: 14, borderRadius: 3,
              background: active === item.key ? 'var(--ot-accent)' : 'var(--ot-border-strong)',
              opacity: active === item.key ? 1 : 0.5,
            }} />
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: 10, fontSize: 11, color: 'var(--ot-fg-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ot-surface-3)',
            display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 600, color: 'var(--ot-fg)' }}>LD</div>
          <div>
            <div style={{ color: 'var(--ot-fg)', fontSize: 11.5 }}>Dr. L. van Daal</div>
            <div>Praktijk Utrecht</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Dir1Topbar({ title }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 28px', borderBottom: '1px solid var(--ot-border)',
      background: 'var(--ot-surface-0)',
    }}>
      <div>
        <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Klantportaal
        </div>
        <h1 style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 600, color: 'var(--ot-fg)' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          all: 'unset', cursor: 'pointer', padding: '8px 14px', borderRadius: 6,
          fontSize: 12.5, border: '1px solid var(--ot-border)', color: 'var(--ot-fg)',
          background: 'var(--ot-surface-1)',
        }}>Exporteer</button>
        <button style={{
          all: 'unset', cursor: 'pointer', padding: '8px 14px', borderRadius: 6,
          fontSize: 12.5, background: 'var(--ot-accent)', color: '#fff', fontWeight: 500,
        }}>+ Nieuwe bestelling</button>
      </div>
    </header>
  );
}

function Dir1OrdersTable({ onOpen }) {
  return (
    <div style={{
      background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)', borderRadius: 10,
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px', borderBottom: '1px solid var(--ot-border)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)' }}>Bestellingen</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Alle', 'Onderweg', 'Geleverd'].map((t, i) => (
            <button key={t} style={{
              all: 'unset', cursor: 'pointer', padding: '4px 10px', borderRadius: 5,
              fontSize: 11.5,
              background: i === 0 ? 'var(--ot-surface-2)' : 'transparent',
              color: i === 0 ? 'var(--ot-fg)' : 'var(--ot-fg-muted)',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
        <thead>
          <tr style={{ background: 'var(--ot-surface-0)' }}>
            {['Order', 'Datum', 'Product', 'Aantal', 'Status', 'Totaal', ''].map(h => (
              <th key={h} style={{
                textAlign: 'left', padding: '10px 16px', fontSize: 11,
                fontWeight: 500, color: 'var(--ot-fg-muted)',
                textTransform: 'uppercase', letterSpacing: 0.4,
                borderBottom: '1px solid var(--ot-border)',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ORALTEC_ORDERS.map((o, i) => (
            <tr key={o.id}
              onClick={() => onOpen(o)}
              style={{ cursor: 'pointer', borderBottom: i === ORALTEC_ORDERS.length - 1 ? 'none' : '1px solid var(--ot-border-soft)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--ot-surface-0)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '14px 16px', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--ot-fg)' }}>{o.id}</td>
              <td style={{ padding: '14px 16px', color: 'var(--ot-fg-soft)' }}>{o.date}</td>
              <td style={{ padding: '14px 16px', color: 'var(--ot-fg)' }}>{o.model}</td>
              <td style={{ padding: '14px 16px', color: 'var(--ot-fg-soft)' }}>{o.units}× {o.variant === 'Eigen branding' ? 'custom' : 'standaard'}</td>
              <td style={{ padding: '14px 16px' }}><StatusPill status={o.status} /></td>
              <td style={{ padding: '14px 16px', color: 'var(--ot-fg)', fontVariantNumeric: 'tabular-nums' }}>{o.total}</td>
              <td style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--ot-fg-muted)', fontSize: 16 }}>›</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dir1QuickReorder() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)', borderRadius: 10, padding: 18,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)', marginBottom: 4 }}>
          Nabestellen
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ot-fg-muted)', marginBottom: 14 }}>
          Oraltec One — je standaardbestelling.
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: 12, borderRadius: 8, border: '1px solid var(--ot-border-soft)',
          background: 'var(--ot-surface-0)',
        }}>
          <PodGlyph size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, color: 'var(--ot-fg)', fontWeight: 500 }}>{ORALTEC_PRODUCT.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', fontFamily: 'IBM Plex Mono, monospace', marginTop: 2 }}>
              {ORALTEC_PRODUCT.price} {ORALTEC_PRODUCT.unit}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--ot-border)', borderRadius: 6 }}>
            <button style={{ all: 'unset', cursor: 'pointer', padding: '6px 10px', color: 'var(--ot-fg-muted)' }}>−</button>
            <div style={{ padding: '6px 10px', fontSize: 12.5, color: 'var(--ot-fg)', fontVariantNumeric: 'tabular-nums', borderLeft: '1px solid var(--ot-border)', borderRight: '1px solid var(--ot-border)' }}>24</div>
            <button style={{ all: 'unset', cursor: 'pointer', padding: '6px 10px', color: 'var(--ot-fg-muted)' }}>+</button>
          </div>
          <button style={{
            all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center',
            padding: '8px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500,
            background: 'var(--ot-accent)', color: '#fff',
          }}>Bestel</button>
        </div>
      </div>

      <div style={{
        background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)', borderRadius: 10, padding: 18,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120,
          borderRadius: '50%', background: 'var(--ot-accent-soft)', opacity: 0.4, filter: 'blur(30px)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 10.5, color: 'var(--ot-accent-strong)', letterSpacing: 0.5,
            textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Custom</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)', marginBottom: 4 }}>
            Oraltec One met eigen branding
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ot-fg-muted)', lineHeight: 1.5, marginBottom: 12 }}>
            Jouw praktijklogo op de pod. Vanaf 25 stuks, levering 3–4 weken.
          </div>
          <button style={{
            all: 'unset', cursor: 'pointer', padding: '7px 14px', borderRadius: 6,
            fontSize: 12, fontWeight: 500,
            border: '1px solid var(--ot-accent)', color: 'var(--ot-accent-strong)',
          }}>Verzoek plaatsen →</button>
        </div>
      </div>
    </div>
  );
}

function Dir1OrderDrawer({ order, onClose }) {
  if (!order) return null;
  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 10,
        animation: 'fadeIn 0.15s ease',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 420,
        background: 'var(--ot-surface-1)', borderLeft: '1px solid var(--ot-border)',
        zIndex: 11, padding: 24, overflowY: 'auto',
        animation: 'slideIn 0.25s cubic-bezier(.2,.8,.2,1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Bestelling</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ot-fg)', fontFamily: 'IBM Plex Mono, monospace', marginTop: 2 }}>{order.id}</div>
          </div>
          <button onClick={onClose} style={{ all: 'unset', cursor: 'pointer', fontSize: 18, color: 'var(--ot-fg-muted)' }}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
          <PodGlyph size={52} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ot-fg)' }}>{order.model}</div>
            <div style={{ fontSize: 12, color: 'var(--ot-fg-muted)', marginTop: 2 }}>{order.units} stuks · {order.variant} · {order.total}</div>
            <div style={{ marginTop: 8 }}><StatusPill status={order.status} /></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            ['Besteldatum', order.date],
            ['Verwacht', order.eta],
            ['Verzending', order.status === 'Onderweg' ? 'DHL Express' : 'DHL Standard'],
            ['Factuur', `${order.id}.pdf`],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: 12, borderRadius: 7, background: 'var(--ot-surface-0)', border: '1px solid var(--ot-border-soft)' }}>
              <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)', textTransform: 'uppercase', letterSpacing: 0.4 }}>{k}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ot-fg)', marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 10 }}>Verzendadres</div>
        <div style={{ padding: 12, borderRadius: 7, background: 'var(--ot-surface-0)', border: '1px solid var(--ot-border-soft)', fontSize: 12.5, color: 'var(--ot-fg)', lineHeight: 1.6, marginBottom: 20 }}>
          Orthodontiepraktijk Utrecht<br />
          Maliebaan 24<br />
          3581 CP Utrecht
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center',
            padding: '10px 14px', borderRadius: 6, fontSize: 12.5, fontWeight: 500,
            background: 'var(--ot-accent)', color: '#fff',
          }}>Opnieuw bestellen</button>
          <button style={{
            all: 'unset', cursor: 'pointer', padding: '10px 14px', borderRadius: 6, fontSize: 12.5,
            border: '1px solid var(--ot-border)', color: 'var(--ot-fg)',
          }}>Factuur</button>
        </div>
      </div>
    </>
  );
}

function Direction1() {
  const [active, setActive] = useState('orders');
  const [openOrder, setOpenOrder] = useState(null);
  const title = useMemo(() => ORALTEC_NAV.find(n => n.key === active)?.label || '', [active]);

  return (
    <div className="ot-root" style={{
      width: 1280, height: 820, display: 'flex', overflow: 'hidden', position: 'relative',
      background: 'var(--ot-surface-0)', color: 'var(--ot-fg)',
      fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13,
    }}>
      <Dir1Sidebar active={active} setActive={setActive} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Dir1Topbar title={title} />
        <div style={{ flex: 1, overflowY: 'auto', padding: 28, display: 'grid',
          gridTemplateColumns: '1fr 320px', gap: 20, alignContent: 'start' }}>
          <Dir1OrdersTable onOpen={setOpenOrder} />
          <Dir1QuickReorder />
        </div>
      </main>
      <Dir1OrderDrawer order={openOrder} onClose={() => setOpenOrder(null)} />
    </div>
  );
}

window.Direction1 = Direction1;
