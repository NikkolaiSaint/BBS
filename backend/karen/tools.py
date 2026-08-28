import platform
import psutil


def system_status():
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage("/")

    return {
        "os": platform.system(),
        "os_version": platform.version(),
        "machine": platform.machine(),

        "cpu_percent": psutil.cpu_percent(interval=1),

        "memory_percent": memory.percent,
        "memory_total_gb": round(memory.total / (1024 ** 3), 2),

        "disk_percent": disk.percent,
        "disk_total_gb": round(disk.total / (1024 ** 3), 2),
    }