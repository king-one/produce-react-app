import './siteUpadate.less';

const SiteUpdate = (props) => {
  return (
    <div className="not-found">
      <h1>sorry</h1>
      <p>网站正在更新中~~~</p>
      <p onClick={(props) => props.history.goBack()}>返回</p>
    </div>
  );
};
export default SiteUpdate;