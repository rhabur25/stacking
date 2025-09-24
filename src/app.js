// Simple interactive stacking demo and educational content
const root = document.getElementById('root');

function renderIntro() {
  return `
    <h1>Stacking: An Interactive Machine Learning Tutorial</h1>
    <div class="card">
      <p><b>Stacking</b> is an ensemble learning technique that combines multiple models (base learners) to improve predictive performance. The predictions of these base models are used as inputs to a final model (meta-learner), which learns how to best combine them.</p>
      <ul>
        <li>Base learners: Different models trained on the same dataset.</li>
        <li>Meta-learner: A model that learns from the outputs of base learners.</li>
      </ul>
    </div>
    <button id="start-demo">Try Interactive Demo</button>
  `;
}

function renderDemo(state) {
  // Simulate predictions from 3 base models and a meta-learner
  const sample = state.sample;
  const base1 = sample * 0.7 + 0.2; // Simulated base model 1
  const base2 = sample * 0.5 + 0.4; // Simulated base model 2
  const base3 = sample * 0.9 - 0.1; // Simulated base model 3
  // Meta-learner: weighted average
  const meta = (base1 * state.weights[0] + base2 * state.weights[1] + base3 * state.weights[2]) / (state.weights[0] + state.weights[1] + state.weights[2]);

  return `
    <h2>Interactive Stacking Demo</h2>
    <div class="card">
      <p>Move the slider to change the input sample. Adjust the weights to see how the meta-learner combines the base models.</p>
      <label>Input sample: <b>${sample.toFixed(2)}</b></label><br />
      <input type="range" min="0" max="1" step="0.01" value="${sample}" id="sample-slider" />
      <div style="margin-top:16px;">
        <b>Base Model Predictions:</b>
        <ul>
          <li>Base 1: <span style="color:#2563eb;">${base1.toFixed(2)}</span></li>
          <li>Base 2: <span style="color:#16a34a;">${base2.toFixed(2)}</span></li>
          <li>Base 3: <span style="color:#f59e42;">${base3.toFixed(2)}</span></li>
        </ul>
      </div>
      <div style="margin-top:16px;">
        <b>Meta-learner Weights:</b><br />
        <label>Base 1: <input type="number" min="0" max="2" step="0.1" value="${state.weights[0]}" id="w0" style="width:50px;" /></label>
        <label>Base 2: <input type="number" min="0" max="2" step="0.1" value="${state.weights[1]}" id="w1" style="width:50px;" /></label>
        <label>Base 3: <input type="number" min="0" max="2" step="0.1" value="${state.weights[2]}" id="w2" style="width:50px;" /></label>
      </div>
      <div style="margin-top:18px;">
        <b>Meta-learner Output:</b> <span style="color:#e11d48;font-size:1.2em;">${meta.toFixed(2)}</span>
      </div>
    </div>
    <button id="back">Back to Theory</button>
  `;
}

function render(state) {
  if (state.demo) {
    root.innerHTML = renderDemo(state);
    document.getElementById('sample-slider').addEventListener('input', e => {
      state.sample = parseFloat(e.target.value);
      render(state);
    });
    [0,1,2].forEach(i => {
      document.getElementById('w'+i).addEventListener('input', e => {
        state.weights[i] = parseFloat(e.target.value);
        render(state);
      });
    });
    document.getElementById('back').onclick = () => {
      state.demo = false;
      render(state);
    };
  } else {
    root.innerHTML = renderIntro();
    document.getElementById('start-demo').onclick = () => {
      state.demo = true;
      render(state);
    };
  }
}

const state = {
  demo: false,
  sample: 0.5,
  weights: [1,1,1]
};

render(state);
