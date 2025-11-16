package com._Home.backend.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com._Home.backend.models.OmiZone;

@Repository
public interface OmiZoneRepo extends JpaRepository<OmiZone, Integer> {

	@Query(value = "SELECT * FROM omi_zones o WHERE ST_Intersects(o.geometry, ST_GeomFromText(?1, 4326)) = 1 LIMIT 1", nativeQuery = true)
	OmiZone findZoneContainingPoint(String wktPoint);

}
