import os
from pathlib import Path

import yaml


def update_analytics_property(file_path, env_var):
    # Check if the GOOGLE_ANALYTICS_ID environment variable is set
    ga_id = os.getenv(env_var)
    print("GA = ", ga_id)
    if not ga_id:
        print(f"Environment variable {env_var} not set. Exiting without changes.")
        return

    # Load the existing mkdocs.yml file
    with file_path.open() as file:
        config = yaml.safe_load(file)

    # Update the analytics property
    if "extra" not in config:
        config["extra"] = {}
    if "analytics" not in config["extra"]:
        config["extra"]["analytics"] = {}
    config["extra"]["analytics"]["property"] = ga_id

    # Save the modified config back to mkdocs.yml
    with file_path.open("w") as file:
        yaml.safe_dump(config, file, sort_keys=False)


if __name__ == "__main__":
    update_analytics_property(Path("mkdocs.yml"), "GOOGLE_ANALYTICS_ID")
