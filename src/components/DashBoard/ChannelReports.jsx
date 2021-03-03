import React from "react";
import Avatar from "../avatar/Avatar";
import "./ChannelReports.css";

function ChannelReports(props) {
  return (
    <div className="bg-light">
      <table className="table  border-white table-bordered text-center report_table">
        <thead>
          <tr className="table-row">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Finished</th>
            <th scope="col">Percentage(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td style={{ verticalAlign: "middle" }}>
              <Avatar />
            </td>
            <td style={{ verticalAlign: "middle" }}>12</td>
            <td style={{ verticalAlign: "middle" }}>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  style={{ width: "25%" }}
                  aria-valuemax="100"
                >
                  50%
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
              <Avatar />
            </td>
            <td>22</td>
            <td>80</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>22</td>
            <td>80</td>
          </tr>
        </tbody>
      </table>
      {/* TODO new channel digging  成功 */}
      {/* TODO 显示模式柱形图*/}
    </div>
  );
}

export default ChannelReports;
