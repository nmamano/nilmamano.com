import numpy as np
import scipy.special as sp
from scipy.optimize import fsolve
import math

def ball_volume(radius, dimension):
    """Calculate the volume of a d-dimensional ball of given radius."""
    return (np.pi ** (dimension / 2)) / sp.gamma(dimension / 2 + 1) * (radius ** dimension)

# Removed intersection_volume_boundary function - now using Monte Carlo only

def monte_carlo_intersection_with_convergence(d, n_samples=1000000, convergence_check_interval=50000):
    """
    Monte Carlo estimation of intersection volume with convergence tracking.
    Hardcoded for large ball radius=1.5, small ball radius=0.5, with small ball center at (1.5, 0, ..., 0).
    """
    large_ball_radius = 1.5
    small_ball_radius = 0.5
    distance = 1.5  # Small ball center is on boundary of large ball
    
    count_intersection = 0
    estimates = []
    
    print(f"Monte Carlo intersection volume estimation:")
    print(f"Large ball radius = 1.5, small ball radius = 0.5, d = {d}")
    print(f"Small ball center at (1.5, 0, ..., 0)")
    print(f"Samples: {n_samples:,}, checking convergence every {convergence_check_interval:,} samples")
    print("-" * 60)
    
    for i in range(n_samples):
        # Generate uniform point in d-dimensional ball of radius 0.5
        # Method: generate normal vector, normalize, then scale by uniform radius
        normal_vec = np.random.normal(0, 1, d)
        if np.linalg.norm(normal_vec) == 0:
            continue
        
        direction = normal_vec / np.linalg.norm(normal_vec)
        # Uniform distribution in d-dimensional ball
        u = np.random.uniform(0, 1)
        radius_sample = small_ball_radius * (u ** (1/d))
        
        # Point in small ball centered at (1.5, 0, ...)
        point = np.zeros(d)
        point[0] = distance
        point += radius_sample * direction
        
        # Check if point is also in large ball (radius 1.5, centered at origin)
        if np.linalg.norm(point) <= large_ball_radius:
            count_intersection += 1
        
        # Check convergence periodically
        if (i + 1) % convergence_check_interval == 0:
            current_estimate = (count_intersection / (i + 1))
            small_ball_volume = ball_volume(0.5, d)
            intersection_volume = small_ball_volume * current_estimate
            estimates.append(intersection_volume)
            
            print(f"After {i+1:7,} samples: ratio = {current_estimate:.8f}, "
                  f"intersection volume = {intersection_volume:.8f}")
            
            # Check convergence (if we have at least 3 estimates)
            if len(estimates) >= 3:
                recent_estimates = estimates[-3:]
                relative_change = abs(recent_estimates[-1] - recent_estimates[-2]) / recent_estimates[-2]
                if relative_change < 0.00001:  # 0.001% convergence threshold
                    print(f"Converged! Relative change: {relative_change:.6f}")
                    break
    
    # Final estimate
    final_ratio = count_intersection / (i + 1)
    small_ball_volume = ball_volume(0.5, d)
    final_intersection_volume = small_ball_volume * final_ratio
    
    print(f"Final estimate after {i+1:,} samples:")
    print(f"Intersection ratio: {final_ratio:.8f}")
    print(f"Small ball volume: {small_ball_volume:.8f}")
    print(f"Intersection volume: {final_intersection_volume:.8f}")
    
    return final_intersection_volume

def solve_epsilon(k):
    """Solve for epsilon such that (1 + epsilon)^k = 1.5"""
    def equation(eps):
        return (1 + eps) ** k - 1.5
    
    # Initial guess
    eps_guess = (1.5 ** (1/k)) - 1
    
    try:
        eps_solution = fsolve(equation, eps_guess)[0]
        return max(eps_solution, 1e-10)  # Ensure epsilon is positive
    except:
        return (1.5 ** (1/k)) - 1  # Fallback to analytical solution

def calculate_constant_factor(d):
    """
    Calculate the constant factor C according to the given formula.
    Hardcoded for large ball radius=1.5, small ball radius=0.5.
    
    Parameters:
    d: dimension
    
    Returns:
    dict with all intermediate values and final result
    """
    results = {}
    
    print(f"\n=== Calculating constant factor for d = {d} ===")
    print(f"Hardcoded values: large ball radius = 1.5, small ball radius = 0.5")
    print()
    
    # Calculate volumes
    V_B_1_5 = ball_volume(1.5, d)
    V_B_1 = ball_volume(1, d)
    results['V_B_1_5'] = V_B_1_5
    results['V_B_1'] = V_B_1
    
    print(f"V(B(1.5)) = {V_B_1_5:.8f}")
    print(f"V(B(1)) = {V_B_1:.8f}")
    print()
    
    # Calculate intersection volume I using Monte Carlo with convergence tracking
    I = monte_carlo_intersection_with_convergence(d)
    results['I'] = I
    print()
    
    if I == 0:
        print(f"Error: Intersection volume is 0")
        results['C'] = float('inf')
        return results
    
    # Calculate k
    k_raw = (V_B_1_5 - V_B_1) / I
    k = math.ceil(k_raw)  # Round up to next integer
    results['k'] = k
    
    print(f"k = (V(B(1.5)) - V(B(1))) / I")
    print(f"k = ({V_B_1_5:.8f} - {V_B_1:.8f}) / {I:.8f}")
    print(f"k_raw = {k_raw:.6f}")
    print(f"k = ceil({k_raw:.6f}) = {k}")
    print()
    
    if k <= 0:
        print(f"Error: k = {k} <= 0")
        results['C'] = float('inf')
        return results
    
    # Solve for epsilon
    epsilon = solve_epsilon(k)
    results['epsilon'] = epsilon
    
    print(f"Solving for epsilon from (1 + ε)^k = 1.5:")
    print(f"epsilon = {epsilon:.10f}")
    print(f"Verification: (1 + {epsilon:.10f})^{k} = {(1 + epsilon)**k:.6f} ≈ 1.5")
    print()
    
    if epsilon <= 0:
        print(f"Error: epsilon = {epsilon} <= 0")
        results['C'] = float('inf')
        return results
    
    # Calculate final constant C
    term1 = k
    term2 = (1 + 6*d/epsilon) ** d
    C = d * (term1 + term2)
    
    results['term1'] = term1
    results['term2'] = term2
    results['C'] = C
    
    print(f"Final calculation:")
    print(f"Term 1: k = {term1}")
    print(f"Term 2: (1 + 6d/ε)^d = (1 + 6×{d}/{epsilon:.10f})^{d} = {term2:.2e}")
    print(f"C = d × (k + (1 + 6d/ε)^d)")
    print(f"C = {d} × ({term1} + {term2:.2e})")
    print(f"C = {C:.2e}")
    
    return results

def main():
    print("=" * 80)
    print("GALACTIC ALGORITHM - CONSTANT FACTOR CALCULATION")
    print("Hardcoded values: large ball radius = 1.5, small ball radius = 0.5")
    print("Computing for dimensions d = 2 to d = 10")
    print("=" * 80)
    
    all_results = []
    
    for d in range(2, 16):
        try:
            print(f"\n{'='*20} DIMENSION d = {d} {'='*20}")
            results = calculate_constant_factor(d)
            all_results.append((d, results))
            
        except Exception as e:
            print(f"Error for dimension d={d}: {e}")
            import traceback
            traceback.print_exc()
            all_results.append((d, None))
    
    # Summary table
    print("\n" + "=" * 100)
    print("SUMMARY TABLE - ALL DIMENSIONS")
    print("=" * 100)
    print(f"{'d':<3} {'V(B(1.5))':<12} {'V(B(1))':<12} {'I':<12} {'k':<6} {'epsilon':<14} {'C':<15}")
    print("-" * 100)
    
    for d, results in all_results:
        if results and 'C' in results and results['C'] != float('inf'):
            print(f"{d:<3} {results['V_B_1_5']:<12.6f} {results['V_B_1']:<12.6f} "
                  f"{results['I']:<12.6f} {results['k']:<6} "
                  f"{results['epsilon']:<14.10f} {results['C']:<15.2e}")
        else:
            print(f"{d:<3} {'Error':<12} {'Error':<12} {'Error':<12} {'Error':<6} {'Error':<14} {'Error':<15}")
    
    print("=" * 100)

if __name__ == "__main__":
    main()
