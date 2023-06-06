interface ProgressBarProps {
    progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <div className="mt-4 h-3 w-full rounded-xl bg-zinc-700">
            <div
                role="progressbar"
                aria-label="Progresso de hábitos completados nesse dia"
                aria-valuenow={progress}
                className="h-3 rounded-xl bg-violet-600 transition-all"
                style={{
                    width: `${progress}%`,
                }}
            />
        </div>
    );
};

export default ProgressBar;
