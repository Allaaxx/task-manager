import PropTypes from "prop-types" // ES6
const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-brand-border pb-1">
      {icon}

      <p className="text-sm text-brand-text-gray">{title}</p>
    </div>
  )
}

TasksSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default TasksSeparator
