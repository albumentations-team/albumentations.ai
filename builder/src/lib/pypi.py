import json
import logging
import os
import subprocess
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def set_google_credentials_path(path: str) -> None:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = path


def get_pypi_download_count(package_name: str, timeout: int = 120) -> int:
    credentials_path = Path(__file__).parent / "google_credentials.json"

    if not credentials_path.exists():
        raise ValueError("Google credentials file not found.")

    package_name = "albumentations"

    set_google_credentials_path(credentials_path.as_posix())

    command = ["pypinfo", "--json", package_name]
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True, timeout=timeout)
        output = json.loads(result.stdout)
        return output["rows"][0]["download_count"]
    except subprocess.CalledProcessError as e:
        logger.exception(f"Command '{e.cmd}' returned non-zero exit status {e.returncode}.")
        logger.exception(f"Output: {e.output}")
        raise ValueError(f"Failed to get download count. Error: {e}.") from e
    except json.JSONDecodeError as e:
        logger.exception("Failed to parse JSON output.")
        logger.exception(f"Error: {e}")
        raise ValueError(f"Failed to parse JSON output Error: {e}.") from e
    except Exception as e:
        logger.exception(f"An error occurred: {e}")
        raise ValueError(f"Failed to get download count. Error: {e}.") from e
