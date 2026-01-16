interface ScrapCountProps {
  count: number;
}

export default function NoticeScrapCount({ count }: ScrapCountProps) {
  return (
    <div>
      <span className="text-status-md">스크랩 ({count})</span>
    </div>
  );
}
