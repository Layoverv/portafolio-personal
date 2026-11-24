import { PROJECT_STATUS } from '../../data/projects.js';

// Cada estado tiene su propio color (ver Projects.css).
const STATUS_CLASS = {
  [PROJECT_STATUS.DONE]: 'status--done',
  [PROJECT_STATUS.ONGOING]: 'status--ongoing',
  [PROJECT_STATUS.IN_PROGRESS]: 'status--progress',
  [PROJECT_STATUS.PLANNED]: 'status--planned',
};

function StatusBadge({ status }) {
  return <span className={`status ${STATUS_CLASS[status] || ''}`}>{status}</span>;
}

export default StatusBadge;
