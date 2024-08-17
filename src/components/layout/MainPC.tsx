'use client';

import { CheckBox } from '../icon/IconSVG';

export default function MainPC() {
  return (
    <div className="mainPC">
      <div>
        <div>
          <span className="font-color-white font-20 line-15">Hello,</span>
          <span className="font-color-white font-20 line-15 font-wt-700">
            {` we're acTIP ;)`}
          </span>
          <br />
          <span className="font-color-white font-20 line-15">
            We exist to help you
          </span>
          <br />
          <span className="font-color-white font-20 line-15">with </span>
          <span className="d-inline-block p-relative top5">
            <CheckBox color="#00e01f" />
          </span>
          <span className="font-highlight-underline font-20 line-15 ml5">
            everyTIP
          </span>
          <span className="font-color-white font-20 line-15">
            {' '}
            you aim for.
          </span>
        </div>
      </div>

      <div>
        <div>
          <span className="font-color-white line-15">
            📫 contect → acTIP team
          </span>
          <br />
          <span className="font-color-white line-15 pl27">actip@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
