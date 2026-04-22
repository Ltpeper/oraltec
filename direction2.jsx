// Direction 2: Product-forward
// Pods visueel centraal, nabestellen in één klik.
// Kaartgebaseerd, hogere visuele hiërarchie op producten.

const { useState: useState2 } = React;

function Dir2Pod({ size = 72, active = true }) {
  return (
    <div style={{
      width: size, height: size * 1.4, borderRadius: size * 0.38,
      background: `linear-gradient(165deg, var(--ot-surface-2), var(--ot-surface-3))`,
      border: '1px solid var(--ot-border)', position: 'relative', flexShrink: 0,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 24px -14px rgba(0,0,0,0.3)',
    }}>
      {/* UV-C gloed */}
      <div style={{
        position: 'absolute', inset: '14% 22% auto 22%', height: '8%',
        borderRadius: 3, background: active ? 'var(--ot-accent)' : 'var(--ot-border-strong)',
        boxShadow: active ? '0 0 14px var(--ot-accent), 0 0 4px var(--ot-accent)' : 'none',
      }} />
      {/* Grille lijnen */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', left: '25%', right: '25%',
          top: `${42 + i * 7}%`, height: 1, background: 'var(--ot-border-strong)', opacity: 0.3,
        }} />
      ))}
      {/* Basis */}
      <div style={{
        position: 'absolute', left: '50%', bottom: '10%', transform: 'translateX(-50%)',
        width: '34%', height: 4, borderRadius: 2, background: 'var(--ot-border-strong)',
      }} />
    </div>
  );
}

function Dir2Nav({ active, setActive }) {
  return (
    <aside style={{
      width: 64, flexShrink: 0, background: 'var(--ot-surface-1)',
      borderRight: '1px solid var(--ot-border)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '18px 0', gap: 4,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, background: 'var(--ot-accent)',
        display: 'grid', placeItems: 'center', color: '#fff', fontSize: 15, fontWeight: 700,
        marginBottom: 14,
      }}>O</div>
      {ORALTEC_NAV.map(item => (
        <button key={item.key} onClick={() => setActive(item.key)}
          title={item.label}
          style={{
            all: 'unset', cursor: 'pointer',
            width: 38, height: 38, borderRadius: 8,
            display: 'grid', placeItems: 'center',
            background: active === item.key ? 'var(--ot-surface-3)' : 'transparent',
            color: active === item.key ? 'var(--ot-fg)' : 'var(--ot-fg-muted)',
            position: 'relative',
          }}>
          <span style={{
            width: 14, height: 14, borderRadius: 3,
            background: active === item.key ? 'var(--ot-accent)' : 'var(--ot-border-strong)',
            opacity: active === item.key ? 1 : 0.6,
          }} />
          {active === item.key && (
            <div style={{ position: 'absolute', left: -1, top: 8, bottom: 8, width: 2, background: 'var(--ot-accent)', borderRadius: 2 }} />
          )}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--ot-surface-3)',
        display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, color: 'var(--ot-fg)' }}>LD</div>
    </aside>
  );
}

function Dir2Hero({ onOpen }) {
  const lastOrder = ORALTEC_ORDERS[0];
  return (
    <div style={{
      background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)',
      borderRadius: 14, padding: 28, display: 'flex', gap: 28, alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -40, right: -20, width: 240, height: 240,
        borderRadius: '50%', background: 'var(--ot-accent-soft)', opacity: 0.4, filter: 'blur(40px)' }} />

      <Dir2Pod size={84} />

      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ fontSize: 11, color: 'var(--ot-accent-strong)', letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
          Laatste bestelling
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--ot-fg)', margin: '4px 0 8px', letterSpacing: -0.3 }}>
          {lastOrder.units}× {lastOrder.model}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ot-fg-soft)', display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{lastOrder.id}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ot-border-strong)' }} />
          <StatusPill status={lastOrder.status} />
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ot-border-strong)' }} />
          <span>Verwacht {lastOrder.eta}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
        <button onClick={() => onOpen(lastOrder)} style={{
          all: 'unset', cursor: 'pointer', padding: '11px 20px', borderRadius: 8,
          fontSize: 13, fontWeight: 500,
          background: 'var(--ot-accent)', color: '#fff', textAlign: 'center',
          boxShadow: '0 4px 12px -4px var(--ot-accent)',
        }}>Opnieuw bestellen</button>
        <button style={{
          all: 'unset', cursor: 'pointer', padding: '10px 20px', borderRadius: 8,
          fontSize: 12.5, textAlign: 'center',
          color: 'var(--ot-fg-soft)', border: '1px solid var(--ot-border)',
        }}>Track verzending</button>
      </div>
    </div>
  );
}

function Dir2ProductGrid() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ot-fg)' }}>Ons product</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <div style={{
          background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)',
          borderRadius: 14, padding: 24, display: 'flex', gap: 20, alignItems: 'center',
        }}>
          <div style={{ display: 'grid', placeItems: 'center', padding: '20px 24px',
            background: 'var(--ot-surface-0)', borderRadius: 10,
            border: '1px dashed var(--ot-border-soft)' }}>
            <Dir2Pod size={64} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 2 }}>
              {ORALTEC_PRODUCT.sku}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ot-fg)', marginBottom: 4 }}>{ORALTEC_PRODUCT.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ot-fg-muted)', lineHeight: 1.5, marginBottom: 14 }}>
              {ORALTEC_PRODUCT.desc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ot-fg)' }}>{ORALTEC_PRODUCT.price}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)' }}>{ORALTEC_PRODUCT.unit}</div>
              </div>
              <div style={{ width: 1, height: 24, background: 'var(--ot-border)' }} />
              <div>
                <div style={{ fontSize: 11.5, color: 'var(--ot-ok-strong)', fontWeight: 500 }}>{ORALTEC_PRODUCT.stock}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)' }}>{ORALTEC_PRODUCT.moq}</div>
              </div>
            </div>
            <button style={{
              all: 'unset', cursor: 'pointer', padding: '9px 16px', borderRadius: 7,
              fontSize: 12.5, fontWeight: 500,
              background: 'var(--ot-accent)', color: '#fff',
            }}>+ Bestellen</button>
          </div>
        </div>

        <div style={{
          background: 'var(--ot-surface-1)', border: '1px dashed var(--ot-accent)', borderRadius: 14, padding: 24,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180,
            borderRadius: '50%', background: 'var(--ot-accent-soft)', opacity: 0.4, filter: 'blur(40px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10.5, color: 'var(--ot-accent-strong)', fontWeight: 500,
              letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
              Custom · op verzoek
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ot-fg)', marginBottom: 4 }}>
              {ORALTEC_CUSTOM.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ot-fg-muted)', lineHeight: 1.5, marginBottom: 14 }}>
              {ORALTEC_CUSTOM.desc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ot-fg)' }}>{ORALTEC_CUSTOM.price}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ot-fg-muted)' }}>{ORALTEC_CUSTOM.moq}</div>
              </div>
            </div>
            <button style={{
              all: 'unset', cursor: 'pointer', padding: '9px 16px', borderRadius: 7,
              fontSize: 12.5, fontWeight: 500,
              border: '1px solid var(--ot-accent)', color: 'var(--ot-accent-strong)',
            }}>Verzoek plaatsen →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dir2RecentOrders({ onOpen }) {
  return (
    <div style={{
      background: 'var(--ot-surface-1)', border: '1px solid var(--ot-border)',
      borderRadius: 12, overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--ot-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ot-fg)' }}>Recente bestellingen</div>
        <button style={{ all: 'unset', cursor: 'pointer', fontSize: 11.5, color: 'var(--ot-fg-muted)' }}>Alles →</button>
      </div>
      <div>
        {ORALTEC_ORDERS.slice(0, 4).map((o, i) => (
          <div key={o.id} onClick={() => onOpen(o)}
            style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr auto auto auto',
              alignItems: 'center', gap: 14, padding: '14px 18px', cursor: 'pointer',
              borderBottom: i === 3 ? 'none' : '1px solid var(--ot-border-soft)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--ot-surface-0)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Dir2Pod size={24} active={o.status === 'Onderweg'} />
            <div>
              <div style={{ fontSize: 12.5, color: 'var(--ot-fg)', fontWeight: 500 }}>{o.units}× {o.model}</div>
              <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', fontFamily: 'IBM Plex Mono, monospace', marginTop: 2 }}>
                {o.id} · {o.date}
              </div>
            </div>
            <StatusPill status={o.status} />
            <div style={{ fontSize: 12.5, color: 'var(--ot-fg)', fontVariantNumeric: 'tabular-nums', minWidth: 80, textAlign: 'right' }}>
              {o.total}
            </div>
            <div style={{ fontSize: 16, color: 'var(--ot-fg-muted)' }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Direction2() {
  const [active, setActive] = useState2('overview');
  const [openOrder, setOpenOrder] = useState2(null);

  return (
    <div className="ot-root" style={{
      width: 1280, height: 820, display: 'flex', overflow: 'hidden', position: 'relative',
      background: 'var(--ot-surface-0)', color: 'var(--ot-fg)',
      fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13,
    }}>
      <Dir2Nav active={active} setActive={setActive} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 32px', borderBottom: '1px solid var(--ot-border)',
        }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ot-fg-muted)', letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Welkom terug
            </div>
            <h1 style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 600, color: 'var(--ot-fg)', letterSpacing: -0.3 }}>
              Dr. van Daal
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ padding: '7px 14px', border: '1px solid var(--ot-border)', borderRadius: 7,
              fontSize: 12, color: 'var(--ot-fg-muted)', display: 'flex', alignItems: 'center', gap: 8, width: 180 }}>
              <span>⌕</span> Zoeken…
            </div>
            <button style={{
              all: 'unset', cursor: 'pointer', padding: '9px 18px', borderRadius: 7,
              fontSize: 12.5, fontWeight: 500, background: 'var(--ot-accent)', color: '#fff',
            }}>+ Nieuwe bestelling</button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Dir2Hero onOpen={setOpenOrder} />
          <Dir2ProductGrid />
          <Dir2RecentOrders onOpen={setOpenOrder} />
        </div>
      </main>

      <Dir1OrderDrawer order={openOrder} onClose={() => setOpenOrder(null)} />
    </div>
  );
}

window.Direction2 = Direction2;
