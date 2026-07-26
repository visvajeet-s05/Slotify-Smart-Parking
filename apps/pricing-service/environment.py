import gymnasium as gym
from gymnasium import spaces
import numpy as np

class ParkingPricingEnv(gym.Env):
    actions = np.array([-0.20, -0.10, 0.0, 0.10, 0.20, 0.30], dtype=np.float32)
    def __init__(self, base_rate=100.0):
        self.base_rate = base_rate
        self.observation_space = spaces.Box(low=0, high=np.inf, shape=(7,), dtype=np.float32)
        self.action_space = spaces.Discrete(len(self.actions)); self.state = np.zeros(7, dtype=np.float32)
    def reset(self, *, seed=None, options=None):
        super().reset(seed=seed); self.state = self.np_random.random(7).astype(np.float32); self.state[3] *= 23; self.state[4] *= 6
        return self.state, {}
    def step(self, action):
        occupancy, arrivals = self.state[0], self.state[1]
        multiplier = 1 + self.actions[action]
        revenue = self.base_rate * multiplier * max(0.0, arrivals * (1 - occupancy / 2))
        reward = revenue - 2.0 * (occupancy - .85) ** 2
        self.state[0] = np.clip(occupancy + arrivals * .04 - self.state[2] * .03, 0, 1)
        self.state[3] = (self.state[3] + 1) % 24
        return self.state, float(reward), False, False, {"multiplier": float(multiplier)}
