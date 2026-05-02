export default function PageHeader({ title, subtitle }) {
  return (
    <div className="border-b border-rule">
      <div className="max-w-2xl mx-auto px-6 pt-14 pb-10">
        <h1 className="font-editorial text-4xl font-normal text-ink">
          {title}
        </h1>
        {subtitle && (
          <p className="text-dust mt-2 text-base">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
