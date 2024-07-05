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

    with credentials_path.open("r") as f:
        logger.info(f"Google credentials: {f.readlines()}")
        c = json.loads(credentials_path)
        logger.info(f"Google credentials: {c}")

    set_google_credentials_path(credentials_path.as_posix())

    command = ["pypinfo", "--json", package_name]
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True, timeout=timeout)
        logger.info(f"Command Output: {result.stdout}")
        logger.info(f"Command Error Output: {result.stderr}")
        output = json.loads(result.stdout)
        return output["rows"][0]["download_count"]
    except subprocess.TimeoutExpired as e:
        logger.exception(f"Command '{e.cmd}' timed out after {timeout} seconds.")
        raise TimeoutError(f"Command '{e.cmd}' timed out after {timeout} seconds.") from e
    except subprocess.CalledProcessError as e:
        logger.exception(f"Command '{e.cmd}' returned non-zero exit status {e.returncode}.")
        logger.exception(f"Command Output: {e.output}")
        logger.exception(f"Command Error Output: {e.stderr}")
        raise ValueError(f"Failed to get download count for {package_name}.") from e
    except json.JSONDecodeError as e:
        logger.exception("Failed to parse JSON output.")
        logger.exception(f"Error: {e}")
        logger.exception(f"Command Output: {result.stdout}")
        logger.exception(f"Command Error Output: {result.stderr}")
        raise ValueError(f"Failed to parse JSON output. Error: {e}.") from e
    except Exception as e:
        logger.exception(f"An error occurred: {e}")
        raise ValueError(f"Failed to get download count. Error: {e}.") from e
