export default function IslamicPattern() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%231B4332' stroke-width='0.5' opacity='0.06'%3E%3Cpolygon points='30,2 58,16 58,44 30,58 2,44 2,16'/%3E%3Cpolygon points='30,10 50,20 50,40 30,50 10,40 10,20'/%3E%3Cline x1='30' y1='2' x2='30' y2='58'/%3E%3Cline x1='2' y1='16' x2='58' y2='44'/%3E%3Cline x1='2' y1='44' x2='58' y2='16'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        opacity: 0.06,
      }}
    />
  );
}
