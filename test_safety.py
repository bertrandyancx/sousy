"""Fast offline checks for the planner's safety boundary."""

import unittest

from app import parse_model_json, validate_plan_shape


class PlannerSafetyTests(unittest.TestCase):
    def test_code_fenced_json_is_parsed(self):
        self.assertEqual(parse_model_json("```json\n{\"ok\": true}\n```"), {"ok": True})

    def test_malformed_task_is_rejected_before_scheduling(self):
        with self.assertRaises(ValueError):
            validate_plan_shape({"tasks": [{"title": "No instruction"}], "cleanup": []})

    def test_non_object_task_is_rejected(self):
        with self.assertRaises(ValueError):
            validate_plan_shape({"tasks": ["turn the burner on"], "cleanup": []})

    def test_unbounded_plan_is_rejected(self):
        with self.assertRaises(ValueError):
            validate_plan_shape({"tasks": [{"task": "do it"}] * 121, "cleanup": []})


if __name__ == "__main__":
    unittest.main()
