export interface GuestMessage {
  name: string;
  msg: string;
  time: string;
}

interface GuestbookListProps {
  messages: GuestMessage[];
}

export function GuestbookList({ messages }: GuestbookListProps) {
  return (
    <div className="space-y-3">
      {messages.map((m, i) => (
        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border text-left" style={{ borderColor: "rgba(201,130,142,0.15)" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium" style={{ fontFamily: "'EB Garamond', serif", color: "#2c1810" }}>{m.name}</p>
            <p className="text-xs" style={{ color: "#c9828e" }}>{m.time}</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#7a5c4f" }}>{m.msg}</p>
        </div>
      ))}
    </div>
  );
}
