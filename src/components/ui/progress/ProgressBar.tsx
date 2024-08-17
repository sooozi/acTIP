interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="progressBar">
      <div style={{ width: `${percentage ? percentage : 0}%` }}></div>
    </div>
  );
};

export default ProgressBar;
