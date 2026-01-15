interface ScrapCountProps {
  count: number;
}

export default function NoticeScrapCount({ count }: ScrapCountProps) {
  return (
    <div>
      <span>스크랩 ({count})</span>
    </div>
  );
}
